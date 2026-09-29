from collections import defaultdict

from sqlalchemy import select, func, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.progress import cruds as progress_cruds
from app.modules.progress.models import LessonCompletion
from app.modules.curriculum import cruds as curriculum_cruds
from app.modules.curriculum.models import Concept
from app.modules.exercises.models import Exercise
from app.modules.dashboard.models import UserActivity, StudyStreak
from app.modules.quizzes.models import QuizSubmission
from app.modules.quizzes.cruds import get_latest_submissions_for_concepts, count_questions_by_concepts
from app.modules.tests.models import TestResult
from app.modules.tests.cruds import list_results_for_concepts, get_mini_test_concept_ids

# Weights matching the frontend's progressService.ts
WEIGHTS = {
    "lesson": 0.20,
    "quiz": 0.15,
    "exercises": 0.30,
    "bac": 0.20,
    "mini_test": 0.15,
}


async def _exercise_ids_by_concept(
    db: AsyncSession, concept_ids: list[str], exercise_type: str
) -> dict[str, list[str]]:
    """One query for every concept's exercise ids, instead of one query per concept."""
    if not concept_ids:
        return {}
    result = await db.execute(
        select(Exercise.concept_id, Exercise.external_id, Exercise.id).where(
            Exercise.concept_id.in_(concept_ids), Exercise.exercise_type == exercise_type
        )
    )
    ids_by_concept: dict[str, list[str]] = defaultdict(list)
    for concept_id, external_id, row_id in result.all():
        ids_by_concept[concept_id].append(external_id or str(row_id))
    return ids_by_concept


async def _activity_rows_for_ids(db: AsyncSession, user_id: int, activity_type: str, ids: list[str]):
    if not ids:
        return []
    result = await db.execute(
        select(UserActivity.external_id, UserActivity.is_correct, UserActivity.completed).where(
            UserActivity.user_id == user_id,
            UserActivity.activity_type == activity_type,
            UserActivity.external_id.in_(ids),
        )
    )
    return result.all()


async def compute_concept_progress_batch(
    db: AsyncSession, user_id: int, concepts: list[Concept]
) -> dict[str, dict]:
    """Computes progress for every given concept using a fixed small number of
    batched queries, instead of the ~8-10 queries per concept that a per-concept
    loop would require."""
    if not concepts:
        return {}

    concept_ids = [c.id for c in concepts]
    chapter_by_concept = {c.id: c.chapter_id for c in concepts}

    lesson_completions = await progress_cruds.get_lesson_completions_for_concepts(db, user_id, concept_ids)
    quiz_submissions = await get_latest_submissions_for_concepts(db, user_id, concept_ids)
    quiz_question_counts = await count_questions_by_concepts(db, concept_ids)
    test_results_by_concept = await list_results_for_concepts(db, user_id, concept_ids)
    mini_test_concept_ids = await get_mini_test_concept_ids(db, concept_ids)

    exercise_ids_by_concept = await _exercise_ids_by_concept(db, concept_ids, "exercise")
    bac_ids_by_concept = await _exercise_ids_by_concept(db, concept_ids, "bac")

    exercise_id_to_concept = {
        eid: cid for cid, ids in exercise_ids_by_concept.items() for eid in ids
    }
    bac_id_to_concept = {eid: cid for cid, ids in bac_ids_by_concept.items() for eid in ids}

    exercise_rows = await _activity_rows_for_ids(
        db, user_id, "exercise", list(exercise_id_to_concept.keys())
    )
    bac_rows = await _activity_rows_for_ids(db, user_id, "bac", list(bac_id_to_concept.keys()))

    exercises_solved: dict[str, int] = defaultdict(int)
    exercises_attempted: dict[str, int] = defaultdict(int)
    for external_id, is_correct, _completed in exercise_rows:
        cid = exercise_id_to_concept.get(external_id)
        if cid is None:
            continue
        exercises_attempted[cid] += 1
        if is_correct:
            exercises_solved[cid] += 1

    bac_solved: dict[str, int] = defaultdict(int)
    for external_id, _is_correct, completed in bac_rows:
        cid = bac_id_to_concept.get(external_id)
        if cid is None:
            continue
        if completed:
            bac_solved[cid] += 1

    progress_by_concept: dict[str, dict] = {}
    for concept in concepts:
        concept_id = concept.id
        chapter_id = chapter_by_concept[concept_id]

        lesson_completion = lesson_completions.get(concept_id)
        lesson_completed = lesson_completion is not None

        quiz_submission = quiz_submissions.get(concept_id)
        quiz_completed = quiz_submission is not None
        quiz_score = quiz_submission.score if quiz_submission else None
        quiz_total = quiz_submission.total if quiz_submission else None

        exercises_total = len(exercise_ids_by_concept.get(concept_id, []))
        exercises_solved_count = exercises_solved.get(concept_id, 0)
        exercises_attempted_count = exercises_attempted.get(concept_id, 0)
        exercises_accuracy = (
            round((exercises_solved_count / exercises_attempted_count) * 100)
            if exercises_attempted_count > 0
            else 0
        )

        bac_total = len(bac_ids_by_concept.get(concept_id, []))
        bac_solved_count = bac_solved.get(concept_id, 0)

        test_results = test_results_by_concept.get(concept_id, [])
        mini_test_completed = len(test_results) > 0
        mini_test_score = None
        mini_test_total = None
        if test_results:
            best = max(test_results, key=lambda r: r.score)
            mini_test_score = best.score
            mini_test_total = best.total_questions

        # Applicability is based on whether the concept actually HAS that kind of content
        # (not whether the student has attempted it yet) — some concepts legitimately have
        # no official BAC problems, so that 20% weight must be redistributed rather than
        # simply lost, or those concepts (and everything sequenced after them) could never
        # reach 100%.
        quiz_exists = quiz_question_counts.get(concept_id, 0) > 0
        mini_test_exists = concept_id in mini_test_concept_ids

        components: list[tuple[float, float]] = [(WEIGHTS["lesson"], 1.0 if lesson_completed else 0.0)]
        if quiz_exists:
            quiz_ratio = min(1, quiz_score / quiz_total) if quiz_completed and quiz_total else 0.0
            components.append((WEIGHTS["quiz"], quiz_ratio))
        if exercises_total > 0:
            components.append((WEIGHTS["exercises"], min(1, exercises_solved_count / exercises_total)))
        if bac_total > 0:
            components.append((WEIGHTS["bac"], min(1, bac_solved_count / bac_total)))
        if mini_test_exists:
            mini_test_ratio = (
                min(1, mini_test_score / mini_test_total) if mini_test_completed and mini_test_total else 0.0
            )
            components.append((WEIGHTS["mini_test"], mini_test_ratio))

        total_weight = sum(weight for weight, _ in components)
        overall = (
            min(100, round(sum(weight * ratio for weight, ratio in components) / total_weight * 100))
            if total_weight > 0
            else 0
        )

        total_time = lesson_completion.video_watched_seconds if lesson_completion else 0
        if quiz_submission and quiz_submission.time_spent_seconds:
            total_time += quiz_submission.time_spent_seconds
        for r in test_results:
            total_time += r.time_spent_seconds or 0

        progress_by_concept[concept_id] = {
            "concept_id": concept_id,
            "chapter_id": chapter_id,
            "lesson_completed": lesson_completed,
            "video_watched_seconds": lesson_completion.video_watched_seconds if lesson_completion else 0,
            "quiz_score": quiz_score,
            "quiz_total": quiz_total,
            "quiz_completed": quiz_completed,
            "exercises_solved_count": exercises_solved_count,
            "exercises_total_count": exercises_total,
            "exercises_accuracy": exercises_accuracy,
            "bac_exercises_solved_count": bac_solved_count,
            "bac_exercises_total_count": bac_total,
            "mini_test_score": mini_test_score,
            "mini_test_total": mini_test_total,
            "mini_test_completed": mini_test_completed,
            "total_time_spent_seconds": total_time,
            "overall_percentage": overall,
        }

    return progress_by_concept


async def compute_concept_progress(db: AsyncSession, user_id: int, concept_id: str, chapter_id: str) -> dict:
    concept = Concept(id=concept_id, chapter_id=chapter_id)
    batch = await compute_concept_progress_batch(db, user_id, [concept])
    return batch[concept_id]


async def compute_chapter_progress(db: AsyncSession, user_id: int, chapter_id: str) -> dict:
    concepts = await curriculum_cruds.list_concepts(db, chapter_id)
    total_concepts = len(concepts)
    if total_concepts == 0:
        return {
            "chapter_id": chapter_id,
            "completed_concepts_count": 0,
            "total_concepts_count": 0,
            "average_mastery_percentage": 0,
            "total_exercises_solved": 0,
            "total_bac_solved": 0,
            "total_time_spent_minutes": 0,
        }

    progress_by_concept = await compute_concept_progress_batch(db, user_id, concepts)

    completed = 0
    percentage_sum = 0
    exercises_solved_total = 0
    bac_solved_total = 0
    time_seconds_total = 0

    for concept in concepts:
        cp = progress_by_concept[concept.id]
        if cp["overall_percentage"] >= 80:
            completed += 1
        percentage_sum += cp["overall_percentage"]
        exercises_solved_total += cp["exercises_solved_count"]
        bac_solved_total += cp["bac_exercises_solved_count"]
        time_seconds_total += cp["total_time_spent_seconds"]

    return {
        "chapter_id": chapter_id,
        "completed_concepts_count": completed,
        "total_concepts_count": total_concepts,
        "average_mastery_percentage": round(percentage_sum / total_concepts),
        "total_exercises_solved": exercises_solved_total,
        "total_bac_solved": bac_solved_total,
        "total_time_spent_minutes": round(time_seconds_total / 60),
    }


async def compute_all_concepts_progress_for_chapter(
    db: AsyncSession, user_id: int, chapter_id: str
) -> dict[str, dict]:
    """Batched per-concept progress for every concept in a chapter, in one round of queries."""
    concepts = await curriculum_cruds.list_concepts(db, chapter_id)
    return await compute_concept_progress_batch(db, user_id, concepts)


async def compute_user_stats(db: AsyncSession, user) -> dict:
    from app.modules.dashboard.cruds import get_or_create_streak

    streak = await get_or_create_streak(db, user.id)
    completed_lessons = await progress_cruds.count_completed_lessons(db, user.id)

    exercises_correct = (
        await db.execute(
            select(func.count()).where(
                UserActivity.user_id == user.id,
                UserActivity.activity_type == "exercise",
                UserActivity.is_correct == True,
            )
        )
    ).scalar() or 0
    exercises_attempted = (
        await db.execute(
            select(func.count()).where(
                UserActivity.user_id == user.id, UserActivity.activity_type == "exercise"
            )
        )
    ).scalar() or 0
    bac_solved = (
        await db.execute(
            select(func.count()).where(
                UserActivity.user_id == user.id,
                UserActivity.activity_type == "bac",
                UserActivity.completed == True,
            )
        )
    ).scalar() or 0
    activity_seconds = (
        await db.execute(
            select(func.coalesce(func.sum(UserActivity.time_spent_seconds), 0)).where(
                UserActivity.user_id == user.id
            )
        )
    ).scalar() or 0
    quiz_seconds = (
        await db.execute(
            select(func.coalesce(func.sum(QuizSubmission.time_spent_seconds), 0)).where(
                QuizSubmission.user_id == user.id
            )
        )
    ).scalar() or 0
    test_seconds = (
        await db.execute(
            select(func.coalesce(func.sum(TestResult.time_spent_seconds), 0)).where(
                TestResult.user_id == user.id
            )
        )
    ).scalar() or 0
    total_study_seconds = int(activity_seconds) + int(quiz_seconds) + int(test_seconds)

    average_accuracy = round((exercises_correct / exercises_attempted) * 100) if exercises_attempted > 0 else 0

    all_concepts = await _all_concepts(db)
    overall_course_progress = 0
    if all_concepts:
        progress_by_concept = await compute_concept_progress_batch(db, user.id, all_concepts)
        total_pct = sum(cp["overall_percentage"] for cp in progress_by_concept.values())
        overall_course_progress = round(total_pct / len(all_concepts))

    return {
        "total_study_time_minutes": round(total_study_seconds / 60),
        "streak_days": streak.current_streak,
        "last_study_date": streak.last_study_date.isoformat() if streak.last_study_date else None,
        "completed_lessons_count": completed_lessons,
        "solved_exercises_count": exercises_correct,
        "solved_bac_count": bac_solved,
        "average_accuracy": average_accuracy,
        "overall_course_progress": overall_course_progress,
        "stream": user.stream,
    }


async def _all_concepts(db: AsyncSession):
    result = await db.execute(select(Concept))
    return list(result.scalars().all())


async def reset_all_progress(db: AsyncSession, user_id: int) -> None:
    """Permanently deletes every record that feeds this user's progress
    calculation — lesson completions, quiz submissions, test results, and
    exercise/BAC activity — plus their study streak, so every percentage and
    stat goes back to 0. Irreversible."""
    await db.execute(delete(LessonCompletion).where(LessonCompletion.user_id == user_id))
    await db.execute(delete(QuizSubmission).where(QuizSubmission.user_id == user_id))
    await db.execute(delete(TestResult).where(TestResult.user_id == user_id))
    await db.execute(delete(UserActivity).where(UserActivity.user_id == user_id))
    await db.execute(delete(StudyStreak).where(StudyStreak.user_id == user_id))
    await db.commit()
