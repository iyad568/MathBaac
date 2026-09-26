from typing import Optional, List
from datetime import datetime

from sqlalchemy import select, func, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.progress.models import (
    LessonCompletion,
    ConceptProgress,
    ExerciseAttempt,
    BACExerciseAttempt,
    QuizResult,
    UserPreferences,
)
from app.modules.tests.models import TestResult


# ==================== LESSON COMPLETION ====================

async def get_lesson_completion(db: AsyncSession, user_id: int, concept_id: str) -> Optional[LessonCompletion]:
    result = await db.execute(
        select(LessonCompletion).where(
            LessonCompletion.user_id == user_id, LessonCompletion.concept_id == concept_id
        )
    )
    return result.scalars().first()


async def mark_lesson_complete(db: AsyncSession, user_id: int, concept_id: str, video_watched_seconds: Optional[int]) -> LessonCompletion:
    completion = await get_lesson_completion(db, user_id, concept_id)
    if completion:
        if video_watched_seconds is not None:
            completion.video_watched_seconds = video_watched_seconds
    else:
        completion = LessonCompletion(
            user_id=user_id,
            concept_id=concept_id,
            video_watched_seconds=video_watched_seconds or 0,
        )
        db.add(completion)
    await db.commit()
    await db.refresh(completion)
    return completion


async def count_completed_lessons(db: AsyncSession, user_id: int) -> int:
    result = await db.execute(
        select(func.count()).select_from(LessonCompletion).where(LessonCompletion.user_id == user_id)
    )
    return result.scalar() or 0


# ==================== CONCEPT PROGRESS ====================

async def get_concept_progress(db: AsyncSession, user_id: int, concept_id: str) -> Optional[ConceptProgress]:
    result = await db.execute(
        select(ConceptProgress).where(
            ConceptProgress.user_id == user_id,
            ConceptProgress.concept_id == concept_id
        )
    )
    return result.scalars().first()


async def get_all_concept_progress(db: AsyncSession, user_id: int) -> List[ConceptProgress]:
    result = await db.execute(
        select(ConceptProgress).where(ConceptProgress.user_id == user_id)
    )
    return list(result.scalars().all())


async def save_concept_progress(
    db: AsyncSession,
    user_id: int,
    concept_id: str,
    chapter_id: str,
    overall_percentage: float,
    lesson_percentage: float,
    quiz_percentage: float,
    exercises_percentage: float,
    bac_percentage: float,
    test_percentage: float,
) -> ConceptProgress:
    progress = await get_concept_progress(db, user_id, concept_id)
    if progress:
        progress.chapter_id = chapter_id
        progress.overall_percentage = overall_percentage
        progress.lesson_percentage = lesson_percentage
        progress.quiz_percentage = quiz_percentage
        progress.exercises_percentage = exercises_percentage
        progress.bac_percentage = bac_percentage
        progress.test_percentage = test_percentage
        progress.updated_at = datetime.utcnow()
    else:
        progress = ConceptProgress(
            user_id=user_id,
            concept_id=concept_id,
            chapter_id=chapter_id,
            overall_percentage=overall_percentage,
            lesson_percentage=lesson_percentage,
            quiz_percentage=quiz_percentage,
            exercises_percentage=exercises_percentage,
            bac_percentage=bac_percentage,
            test_percentage=test_percentage,
        )
        db.add(progress)
    await db.commit()
    await db.refresh(progress)
    return progress


# ==================== EXERCISE ATTEMPTS ====================

async def get_exercise_attempt(db: AsyncSession, user_id: int, exercise_id: str) -> Optional[ExerciseAttempt]:
    result = await db.execute(
        select(ExerciseAttempt).where(
            ExerciseAttempt.user_id == user_id,
            ExerciseAttempt.exercise_id == exercise_id
        )
    )
    return result.scalars().first()


async def get_all_exercise_attempts(db: AsyncSession, user_id: int) -> List[ExerciseAttempt]:
    result = await db.execute(
        select(ExerciseAttempt).where(ExerciseAttempt.user_id == user_id)
    )
    return list(result.scalars().all())


async def save_exercise_attempt(
    db: AsyncSession,
    user_id: int,
    exercise_id: str,
    concept_id: str,
    chapter_id: str,
    student_answer: str,
    is_correct: bool,
    score: int,
    time_spent_seconds: Optional[int] = None,
) -> ExerciseAttempt:
    attempt = await get_exercise_attempt(db, user_id, exercise_id)
    if attempt:
        attempt.student_answer = student_answer
        attempt.is_correct = is_correct
        attempt.score = score
        attempt.time_spent_seconds = time_spent_seconds
        attempt.updated_at = datetime.utcnow()
    else:
        attempt = ExerciseAttempt(
            user_id=user_id,
            exercise_id=exercise_id,
            concept_id=concept_id,
            chapter_id=chapter_id,
            student_answer=student_answer,
            is_correct=is_correct,
            score=score,
            time_spent_seconds=time_spent_seconds,
        )
        db.add(attempt)
    await db.commit()
    await db.refresh(attempt)
    return attempt


async def count_solved_exercises(db: AsyncSession, user_id: int) -> int:
    result = await db.execute(
        select(func.count()).select_from(ExerciseAttempt).where(
            ExerciseAttempt.user_id == user_id,
            ExerciseAttempt.is_correct == True
        )
    )
    return result.scalar() or 0


# ==================== BAC EXERCISE ATTEMPTS ====================

async def get_bac_attempt(db: AsyncSession, user_id: int, bac_exercise_id: str) -> Optional[BACExerciseAttempt]:
    result = await db.execute(
        select(BACExerciseAttempt).where(
            BACExerciseAttempt.user_id == user_id,
            BACExerciseAttempt.bac_exercise_id == bac_exercise_id
        )
    )
    return result.scalars().first()


async def get_all_bac_attempts(db: AsyncSession, user_id: int) -> List[BACExerciseAttempt]:
    result = await db.execute(
        select(BACExerciseAttempt).where(BACExerciseAttempt.user_id == user_id)
    )
    return list(result.scalars().all())


async def save_bac_attempt(
    db: AsyncSession,
    user_id: int,
    bac_exercise_id: str,
    concept_id: str,
    chapter_id: str,
    year: int,
    stream: str,
    session: str,
    student_answer: str,
    is_correct: bool,
    score: int,
    time_spent_seconds: Optional[int] = None,
) -> BACExerciseAttempt:
    attempt = await get_bac_attempt(db, user_id, bac_exercise_id)
    if attempt:
        attempt.student_answer = student_answer
        attempt.is_correct = is_correct
        attempt.score = score
        attempt.time_spent_seconds = time_spent_seconds
        attempt.updated_at = datetime.utcnow()
    else:
        attempt = BACExerciseAttempt(
            user_id=user_id,
            bac_exercise_id=bac_exercise_id,
            concept_id=concept_id,
            chapter_id=chapter_id,
            year=year,
            stream=stream,
            session=session,
            student_answer=student_answer,
            is_correct=is_correct,
            score=score,
            time_spent_seconds=time_spent_seconds,
        )
        db.add(attempt)
    await db.commit()
    await db.refresh(attempt)
    return attempt


async def count_solved_bac(db: AsyncSession, user_id: int) -> int:
    result = await db.execute(
        select(func.count()).select_from(BACExerciseAttempt).where(
            BACExerciseAttempt.user_id == user_id,
            BACExerciseAttempt.is_correct == True
        )
    )
    return result.scalar() or 0


# ==================== QUIZ RESULTS ====================

async def get_quiz_result(db: AsyncSession, user_id: int, concept_id: str) -> Optional[QuizResult]:
    result = await db.execute(
        select(QuizResult).where(
            QuizResult.user_id == user_id,
            QuizResult.concept_id == concept_id
        )
    )
    return result.scalars().first()


async def get_all_quiz_results(db: AsyncSession, user_id: int) -> List[QuizResult]:
    result = await db.execute(
        select(QuizResult).where(QuizResult.user_id == user_id)
    )
    return list(result.scalars().all())


async def save_quiz_result(
    db: AsyncSession,
    user_id: int,
    concept_id: str,
    chapter_id: str,
    score: int,
    total: int,
    answers: dict,
    time_spent_seconds: Optional[int] = None,
) -> QuizResult:
    quiz = await get_quiz_result(db, user_id, concept_id)
    if quiz:
        quiz.score = score
        quiz.total = total
        quiz.answers = answers
        quiz.time_spent_seconds = time_spent_seconds
        quiz.updated_at = datetime.utcnow()
    else:
        quiz = QuizResult(
            user_id=user_id,
            concept_id=concept_id,
            chapter_id=chapter_id,
            score=score,
            total=total,
            answers=answers,
            time_spent_seconds=time_spent_seconds,
        )
        db.add(quiz)
    await db.commit()
    await db.refresh(quiz)
    return quiz


# ==================== TEST RESULTS ====================

async def get_test_result(db: AsyncSession, user_id: int, test_id: str) -> Optional[TestResult]:
    result = await db.execute(
        select(TestResult).where(
            TestResult.user_id == user_id,
            TestResult.test_id == test_id
        )
    )
    return result.scalars().first()


async def get_all_test_results(db: AsyncSession, user_id: int, concept_id: Optional[str] = None) -> List[TestResult]:
    query = select(TestResult).where(TestResult.user_id == user_id)
    if concept_id:
        query = query.where(TestResult.concept_id == concept_id)
    result = await db.execute(query)
    return list(result.scalars().all())


async def save_test_result(
    db: AsyncSession,
    user_id: int,
    test_id: str,
    concept_id: str,
    chapter_id: str,
    score: int,
    total: int,
    problem_scores: dict,
    time_spent_seconds: Optional[int] = None,
) -> TestResult:
    test = await get_test_result(db, user_id, test_id)
    if test:
        test.score = score
        test.total = total
        test.problem_scores = problem_scores
        test.time_spent_seconds = time_spent_seconds
        test.updated_at = datetime.utcnow()
    else:
        test = TestResult(
            user_id=user_id,
            test_id=test_id,
            concept_id=concept_id,
            chapter_id=chapter_id,
            score=score,
            total=total,
            problem_scores=problem_scores,
            time_spent_seconds=time_spent_seconds,
        )
        db.add(test)
    await db.commit()
    await db.refresh(test)
    return test


# ==================== USER PREFERENCES ====================

async def get_user_preferences(db: AsyncSession, user_id: int) -> Optional[UserPreferences]:
    result = await db.execute(
        select(UserPreferences).where(UserPreferences.user_id == user_id)
    )
    return result.scalars().first()


async def save_user_preferences(
    db: AsyncSession,
    user_id: int,
    theme: Optional[str] = None,
    active_stream: Optional[str] = None,
    target_bac_score: Optional[int] = None,
    progress_weights: Optional[dict] = None,
    notifications_enabled: Optional[bool] = None,
) -> UserPreferences:
    prefs = await get_user_preferences(db, user_id)
    if prefs:
        if theme is not None:
            prefs.theme = theme
        if active_stream is not None:
            prefs.active_stream = active_stream
        if target_bac_score is not None:
            prefs.target_bac_score = target_bac_score
        if progress_weights is not None:
            prefs.progress_weights = progress_weights
        if notifications_enabled is not None:
            prefs.notifications_enabled = notifications_enabled
        prefs.updated_at = datetime.utcnow()
    else:
        prefs = UserPreferences(
            user_id=user_id,
            theme=theme or 'light',
            active_stream=active_stream or 'شعبة العلوم التجريبية',
            target_bac_score=target_bac_score or 15,
            progress_weights=progress_weights or {},
            notifications_enabled=notifications_enabled if notifications_enabled is not None else True,
        )
        db.add(prefs)
    await db.commit()
    await db.refresh(prefs)
    return prefs


# ==================== BULK SYNC ====================

async def bulk_delete_user_progress(db: AsyncSession, user_id: int):
    """Delete all progress data for a user (for testing/reset)"""
    await db.execute(delete(ConceptProgress).where(ConceptProgress.user_id == user_id))
    await db.execute(delete(ExerciseAttempt).where(ExerciseAttempt.user_id == user_id))
    await db.execute(delete(BACExerciseAttempt).where(BACExerciseAttempt.user_id == user_id))
    await db.execute(delete(QuizResult).where(QuizResult.user_id == user_id))
    await db.execute(delete(TestResult).where(TestResult.user_id == user_id))
    await db.commit()
