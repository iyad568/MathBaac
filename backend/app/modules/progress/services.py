from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.progress import cruds as progress_cruds
from app.modules.curriculum import cruds as curriculum_cruds
from app.modules.exercises.models import Exercise
from app.modules.dashboard.models import UserActivity, StudyStreak
from app.modules.quizzes.cruds import get_latest_submission as get_latest_quiz_submission
from app.modules.tests.cruds import list_results as list_test_results

# Weights matching the frontend's progressService.ts
WEIGHTS = {
    "lesson": 0.20,
    "quiz": 0.15,
    "exercises": 0.30,
    "bac": 0.20,
    "mini_test": 0.15,
}


async def _exercise_ids_for_concept(db: AsyncSession, concept_id: str, exercise_type: str) -> list[str]:
    """Keys that user_activities.external_id uses: the frontend id when imported, else the row id."""
    result = await db.execute(
        select(Exercise.external_id, Exercise.id).where(
            Exercise.concept_id == concept_id, Exercise.exercise_type == exercise_type
        )
    )
    return [external_id or str(row_id) for external_id, row_id in result.all()]


async def _solved_count(db: AsyncSession, user_id: int, activity_type: str, external_ids: list[str]) -> int:
    if not external_ids:
        return 0
    filters = [
        UserActivity.user_id == user_id,
        UserActivity.activity_type == activity_type,
        UserActivity.external_id.in_(external_ids),
    ]
    if activity_type == "exercise":
        filters.append(UserActivity.is_correct == True)
    else:
        filters.append(UserActivity.completed == True)
    result = await db.execute(select(func.count()).where(*filters))
    return result.scalar() or 0


async def _attempted_count(db: AsyncSession, user_id: int, activity_type: str, external_ids: list[str]) -> int:
    if not external_ids:
        return 0
    result = await db.execute(
        select(func.count()).where(
            UserActivity.user_id == user_id,
            UserActivity.activity_type == activity_type,
            UserActivity.external_id.in_(external_ids),
        )
    )
    return result.scalar() or 0


async def compute_concept_progress(db: AsyncSession, user_id: int, concept_id: str, chapter_id: str) -> dict:
    lesson_completion = await progress_cruds.get_lesson_completion(db, user_id, concept_id)
    lesson_completed = lesson_completion is not None

    quiz_submission = await get_latest_quiz_submission(db, user_id, concept_id)
    quiz_completed = quiz_submission is not None
    quiz_score = quiz_submission.score if quiz_submission else None
    quiz_total = quiz_submission.total if quiz_submission else None

    exercise_ids = await _exercise_ids_for_concept(db, concept_id, "exercise")
    bac_ids = await _exercise_ids_for_concept(db, concept_id, "bac")

    exercises_total = len(exercise_ids)
    exercises_solved = await _solved_count(db, user_id, "exercise", exercise_ids)
    exercises_attempted = await _attempted_count(db, user_id, "exercise", exercise_ids)
    exercises_accuracy = round((exercises_solved / exercises_attempted) * 100) if exercises_attempted > 0 else 0

    bac_total = len(bac_ids)
    bac_solved = await _solved_count(db, user_id, "bac", bac_ids)

    test_results = await list_test_results(db, user_id, concept_id)
    mini_test_completed = len(test_results) > 0
    mini_test_score = None
    mini_test_total = None
    if test_results:
        best = max(test_results, key=lambda r: r.score)
        mini_test_score = best.score
        mini_test_total = best.total_questions

    lesson_portion = WEIGHTS["lesson"] * 100 if lesson_completed else 0
    quiz_portion = (
        min(1, quiz_score / quiz_total) * WEIGHTS["quiz"] * 100 if quiz_completed and quiz_total else 0
    )
    exercises_portion = (
        min(1, exercises_solved / exercises_total) * WEIGHTS["exercises"] * 100 if exercises_total > 0 else 0
    )
    bac_portion = min(1, bac_solved / bac_total) * WEIGHTS["bac"] * 100 if bac_total > 0 else 0
    mini_test_portion = (
        min(1, mini_test_score / mini_test_total) * WEIGHTS["mini_test"] * 100
        if mini_test_completed and mini_test_total
        else 0
    )

    overall = min(100, round(lesson_portion + quiz_portion + exercises_portion + bac_portion + mini_test_portion))

    total_time = lesson_completion.video_watched_seconds if lesson_completion else 0
    if quiz_submission and quiz_submission.time_spent_seconds:
        total_time += quiz_submission.time_spent_seconds
    for r in test_results:
        total_time += r.time_spent_seconds or 0

    return {
        "concept_id": concept_id,
        "chapter_id": chapter_id,
        "lesson_completed": lesson_completed,
        "video_watched_seconds": lesson_completion.video_watched_seconds if lesson_completion else 0,
        "quiz_score": quiz_score,
        "quiz_total": quiz_total,
        "quiz_completed": quiz_completed,
        "exercises_solved_count": exercises_solved,
        "exercises_total_count": exercises_total,
        "exercises_accuracy": exercises_accuracy,
        "bac_exercises_solved_count": bac_solved,
        "bac_exercises_total_count": bac_total,
        "mini_test_score": mini_test_score,
        "mini_test_total": mini_test_total,
        "mini_test_completed": mini_test_completed,
        "total_time_spent_seconds": total_time,
        "overall_percentage": overall,
    }


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

    completed = 0
    percentage_sum = 0
    exercises_solved_total = 0
    bac_solved_total = 0
    time_seconds_total = 0

    for concept in concepts:
        cp = await compute_concept_progress(db, user_id, concept.id, chapter_id)
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

    average_accuracy = round((exercises_correct / exercises_attempted) * 100) if exercises_attempted > 0 else 0

    all_concepts = await _all_concepts(db)
    overall_course_progress = 0
    if all_concepts:
        total_pct = 0
        for concept in all_concepts:
            cp = await compute_concept_progress(db, user.id, concept.id, concept.chapter_id)
            total_pct += cp["overall_percentage"]
        overall_course_progress = round(total_pct / len(all_concepts))

    return {
        "total_study_time_minutes": round(int(activity_seconds) / 60),
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
    from app.modules.curriculum.models import Concept

    result = await db.execute(select(Concept))
    return list(result.scalars().all())
