from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.dependencies import get_current_user
from app.modules.curriculum import cruds as curriculum_cruds
from app.modules.progress import cruds, services
from app.modules.progress.schemas import (
    LessonCompleteRequest,
    ConceptProgressResponse,
    ChapterProgressResponse,
    UserStudyStatsResponse,
    SaveConceptProgressRequest,
    ConceptProgressData,
    SaveExerciseAttemptRequest,
    ExerciseAttemptData,
    SaveBACAttemptRequest,
    BACAttemptData,
    SaveQuizResultRequest,
    QuizResultData,
    SaveTestResultRequest,
    TestResultData,
    UserPreferencesData,
    UpdatePreferencesRequest,
    AllProgressResponse,
    BulkSyncRequest,
    BulkSyncResponse,
)

router = APIRouter(prefix="/progress", tags=["Progress"])


# ==================== EXISTING ENDPOINTS ====================

@router.post("/lesson-complete", status_code=status.HTTP_201_CREATED)
async def mark_lesson_complete(
    data: LessonCompleteRequest,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    await cruds.mark_lesson_complete(db, current_user.id, data.concept_id, data.video_watched_seconds)
    return {"concept_id": data.concept_id, "lesson_completed": True}


@router.get("/concept/{concept_id}", response_model=ConceptProgressResponse)
async def get_concept_progress(
    concept_id: str,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    concept = await curriculum_cruds.get_concept(db, concept_id)
    if not concept:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Concept not found")
    return await services.compute_concept_progress(db, current_user.id, concept_id, concept.chapter_id)


@router.get("/chapter/{chapter_id}", response_model=ChapterProgressResponse)
async def get_chapter_progress(
    chapter_id: str,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await services.compute_chapter_progress(db, current_user.id, chapter_id)


@router.get("/chapter/{chapter_id}/concepts", response_model=list[ConceptProgressResponse])
async def get_chapter_concepts_progress(
    chapter_id: str,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Progress for every concept in a chapter in one batched call, instead of
    the frontend firing one request per concept."""
    progress_by_concept = await services.compute_all_concepts_progress_for_chapter(
        db, current_user.id, chapter_id
    )
    return list(progress_by_concept.values())


@router.get("/stats", response_model=UserStudyStatsResponse)
async def get_user_stats(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await services.compute_user_stats(db, current_user)


@router.post("/reset")
async def reset_progress(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Wipes all of the current user's progress data (lesson completions, quiz/test
    results, exercise/BAC activity, streak) — irreversible."""
    await services.reset_all_progress(db, current_user.id)
    return {"message": "تمت إعادة ضبط كافة بيانات التقدم بنجاح"}


# ==================== NEW CONCEPT PROGRESS ENDPOINTS ====================

@router.post("/concept", status_code=status.HTTP_201_CREATED)
async def save_concept_progress(
    data: SaveConceptProgressRequest,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Save or update concept progress"""
    progress = await cruds.save_concept_progress(
        db=db,
        user_id=current_user.id,
        concept_id=data.concept_id,
        chapter_id=data.chapter_id,
        overall_percentage=data.overall_percentage,
        lesson_percentage=data.lesson_percentage,
        quiz_percentage=data.quiz_percentage,
        exercises_percentage=data.exercises_percentage,
        bac_percentage=data.bac_percentage,
        test_percentage=data.test_percentage,
    )
    return {
        "conceptId": progress.concept_id,
        "chapterId": progress.chapter_id,
        "overallPercentage": progress.overall_percentage,
        "message": "Progress saved successfully"
    }


@router.get("/concepts", response_model=list[ConceptProgressData])
async def get_all_concepts_progress(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Get all concept progress for the user"""
    progress_list = await cruds.get_all_concept_progress(db, current_user.id)
    return [
        ConceptProgressData(
            concept_id=p.concept_id,
            chapter_id=p.chapter_id,
            overall_percentage=p.overall_percentage,
            lesson_percentage=p.lesson_percentage,
            quiz_percentage=p.quiz_percentage,
            exercises_percentage=p.exercises_percentage,
            bac_percentage=p.bac_percentage,
            test_percentage=p.test_percentage,
            created_at=p.created_at.isoformat(),
            updated_at=p.updated_at.isoformat(),
        )
        for p in progress_list
    ]


# ==================== EXERCISE ATTEMPTS ENDPOINTS ====================

@router.post("/exercise", status_code=status.HTTP_201_CREATED)
async def save_exercise_attempt(
    data: SaveExerciseAttemptRequest,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Save or update exercise attempt"""
    attempt = await cruds.save_exercise_attempt(
        db=db,
        user_id=current_user.id,
        exercise_id=data.exercise_id,
        concept_id=data.concept_id,
        chapter_id=data.chapter_id,
        student_answer=data.student_answer,
        is_correct=data.is_correct,
        score=data.score,
        time_spent_seconds=data.time_spent_seconds,
    )
    return {
        "exerciseId": attempt.exercise_id,
        "isCorrect": attempt.is_correct,
        "score": attempt.score,
        "message": "Exercise attempt saved"
    }


@router.get("/exercises", response_model=list[ExerciseAttemptData])
async def get_all_exercise_attempts(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Get all exercise attempts for the user"""
    attempts = await cruds.get_all_exercise_attempts(db, current_user.id)
    return [
        ExerciseAttemptData(
            exercise_id=a.exercise_id,
            concept_id=a.concept_id,
            chapter_id=a.chapter_id,
            student_answer=a.student_answer,
            is_correct=a.is_correct,
            score=a.score,
            time_spent_seconds=a.time_spent_seconds,
            created_at=a.created_at.isoformat(),
            updated_at=a.updated_at.isoformat(),
        )
        for a in attempts
    ]


# ==================== BAC EXERCISE ENDPOINTS ====================

@router.post("/bac", status_code=status.HTTP_201_CREATED)
async def save_bac_attempt(
    data: SaveBACAttemptRequest,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Save or update BAC exercise attempt"""
    attempt = await cruds.save_bac_attempt(
        db=db,
        user_id=current_user.id,
        bac_exercise_id=data.bac_exercise_id,
        concept_id=data.concept_id,
        chapter_id=data.chapter_id,
        year=data.year,
        stream=data.stream,
        session=data.session,
        student_answer=data.student_answer,
        is_correct=data.is_correct,
        score=data.score,
        time_spent_seconds=data.time_spent_seconds,
    )
    return {
        "bacExerciseId": attempt.bac_exercise_id,
        "year": attempt.year,
        "isCorrect": attempt.is_correct,
        "message": "BAC attempt saved"
    }


@router.get("/bac", response_model=list[BACAttemptData])
async def get_all_bac_attempts(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Get all BAC attempts for the user"""
    attempts = await cruds.get_all_bac_attempts(db, current_user.id)
    return [
        BACAttemptData(
            bac_exercise_id=a.bac_exercise_id,
            concept_id=a.concept_id,
            chapter_id=a.chapter_id,
            year=a.year,
            stream=a.stream,
            session=a.session,
            student_answer=a.student_answer,
            is_correct=a.is_correct,
            score=a.score,
            time_spent_seconds=a.time_spent_seconds,
            created_at=a.created_at.isoformat(),
            updated_at=a.updated_at.isoformat(),
        )
        for a in attempts
    ]


# ==================== QUIZ RESULTS ENDPOINTS ====================

@router.post("/quiz", status_code=status.HTTP_201_CREATED)
async def save_quiz_result(
    data: SaveQuizResultRequest,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Save or update quiz result"""
    quiz = await cruds.save_quiz_result(
        db=db,
        user_id=current_user.id,
        concept_id=data.concept_id,
        chapter_id=data.chapter_id,
        score=data.score,
        total=data.total,
        answers=data.answers,
        time_spent_seconds=data.time_spent_seconds,
    )
    return {
        "conceptId": quiz.concept_id,
        "score": quiz.score,
        "total": quiz.total,
        "message": "Quiz result saved"
    }


@router.get("/quizzes", response_model=list[QuizResultData])
async def get_all_quiz_results(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Get all quiz results for the user"""
    quizzes = await cruds.get_all_quiz_results(db, current_user.id)
    return [
        QuizResultData(
            concept_id=q.concept_id,
            chapter_id=q.chapter_id,
            score=q.score,
            total=q.total,
            answers=q.answers,
            time_spent_seconds=q.time_spent_seconds,
            created_at=q.created_at.isoformat(),
            updated_at=q.updated_at.isoformat(),
        )
        for q in quizzes
    ]


# ==================== TEST RESULTS ENDPOINTS ====================

@router.post("/test", status_code=status.HTTP_201_CREATED)
async def save_test_result(
    data: SaveTestResultRequest,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Save or update test result"""
    test = await cruds.save_test_result(
        db=db,
        user_id=current_user.id,
        test_id=data.test_id,
        concept_id=data.concept_id,
        chapter_id=data.chapter_id,
        score=data.score,
        total=data.total,
        problem_scores=data.problem_scores,
        time_spent_seconds=data.time_spent_seconds,
    )
    return {
        "testId": test.test_id,
        "score": test.score,
        "total": test.total,
        "message": "Test result saved"
    }


@router.get("/tests", response_model=list[TestResultData])
async def get_all_test_results(
    concept_id: str = None,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Get all test results for the user (optionally filtered by concept)"""
    tests = await cruds.get_all_test_results(db, current_user.id, concept_id)
    return [
        TestResultData(
            test_id=t.test_id,
            concept_id=t.concept_id,
            chapter_id=t.chapter_id,
            score=t.score,
            total=t.total,
            problem_scores=t.problem_scores,
            time_spent_seconds=t.time_spent_seconds,
            created_at=t.created_at.isoformat(),
            updated_at=t.updated_at.isoformat(),
        )
        for t in tests
    ]


# ==================== USER PREFERENCES ENDPOINTS ====================

@router.get("/preferences", response_model=UserPreferencesData)
async def get_user_preferences(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Get user preferences"""
    prefs = await cruds.get_user_preferences(db, current_user.id)
    if not prefs:
        # Return defaults if not found
        return UserPreferencesData()
    return UserPreferencesData(
        theme=prefs.theme,
        active_stream=prefs.active_stream,
        target_bac_score=prefs.target_bac_score,
        progress_weights=prefs.progress_weights,
        notifications_enabled=prefs.notifications_enabled,
    )


@router.put("/preferences")
async def update_user_preferences(
    data: UpdatePreferencesRequest,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Update user preferences"""
    prefs = await cruds.save_user_preferences(
        db=db,
        user_id=current_user.id,
        theme=data.theme,
        active_stream=data.active_stream,
        target_bac_score=data.target_bac_score,
        progress_weights=data.progress_weights,
        notifications_enabled=data.notifications_enabled,
    )
    return {
        "theme": prefs.theme,
        "activeStream": prefs.active_stream,
        "message": "Preferences updated successfully"
    }


# ==================== BULK SYNC ENDPOINTS ====================

@router.get("/all", response_model=AllProgressResponse)
async def load_all_progress(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Load all user progress data (for initial sync or device switch)"""
    # Get all data
    concepts = await cruds.get_all_concept_progress(db, current_user.id)
    exercises = await cruds.get_all_exercise_attempts(db, current_user.id)
    bac = await cruds.get_all_bac_attempts(db, current_user.id)
    quizzes = await cruds.get_all_quiz_results(db, current_user.id)
    tests = await cruds.get_all_test_results(db, current_user.id)
    prefs = await cruds.get_user_preferences(db, current_user.id)

    # Convert to response format
    return AllProgressResponse(
        concepts=[
            ConceptProgressData(
                concept_id=c.concept_id,
                chapter_id=c.chapter_id,
                overall_percentage=c.overall_percentage,
                lesson_percentage=c.lesson_percentage,
                quiz_percentage=c.quiz_percentage,
                exercises_percentage=c.exercises_percentage,
                bac_percentage=c.bac_percentage,
                test_percentage=c.test_percentage,
                created_at=c.created_at.isoformat(),
                updated_at=c.updated_at.isoformat(),
            )
            for c in concepts
        ],
        exercises=[
            ExerciseAttemptData(
                exercise_id=e.exercise_id,
                concept_id=e.concept_id,
                chapter_id=e.chapter_id,
                student_answer=e.student_answer,
                is_correct=e.is_correct,
                score=e.score,
                time_spent_seconds=e.time_spent_seconds,
                created_at=e.created_at.isoformat(),
                updated_at=e.updated_at.isoformat(),
            )
            for e in exercises
        ],
        bac_exercises=[
            BACAttemptData(
                bac_exercise_id=b.bac_exercise_id,
                concept_id=b.concept_id,
                chapter_id=b.chapter_id,
                year=b.year,
                stream=b.stream,
                session=b.session,
                student_answer=b.student_answer,
                is_correct=b.is_correct,
                score=b.score,
                time_spent_seconds=b.time_spent_seconds,
                created_at=b.created_at.isoformat(),
                updated_at=b.updated_at.isoformat(),
            )
            for b in bac
        ],
        quizzes=[
            QuizResultData(
                concept_id=q.concept_id,
                chapter_id=q.chapter_id,
                score=q.score,
                total=q.total,
                answers=q.answers,
                time_spent_seconds=q.time_spent_seconds,
                created_at=q.created_at.isoformat(),
                updated_at=q.updated_at.isoformat(),
            )
            for q in quizzes
        ],
        tests=[
            TestResultData(
                test_id=t.test_id,
                concept_id=t.concept_id,
                chapter_id=t.chapter_id,
                score=t.score,
                total=t.total,
                problem_scores=t.problem_scores,
                time_spent_seconds=t.time_spent_seconds,
                created_at=t.created_at.isoformat(),
                updated_at=t.updated_at.isoformat(),
            )
            for t in tests
        ],
        preferences=UserPreferencesData(
            theme=prefs.theme if prefs else 'light',
            active_stream=prefs.active_stream if prefs else 'شعبة العلوم التجريبية',
            target_bac_score=prefs.target_bac_score if prefs else 15,
            progress_weights=prefs.progress_weights if prefs else {},
            notifications_enabled=prefs.notifications_enabled if prefs else True,
        ),
    )


@router.post("/sync", response_model=BulkSyncResponse)
async def bulk_sync_progress(
    data: BulkSyncRequest,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Bulk sync all progress data from localStorage to backend (migration endpoint)"""
    synced_counts = {
        "concepts": 0,
        "exercises": 0,
        "bac": 0,
        "quizzes": 0,
        "tests": 0,
        "preferences": False,
    }

    # Sync concepts
    for concept_data in data.concepts:
        await cruds.save_concept_progress(
            db=db,
            user_id=current_user.id,
            concept_id=concept_data.concept_id,
            chapter_id=concept_data.chapter_id,
            overall_percentage=concept_data.overall_percentage,
            lesson_percentage=concept_data.lesson_percentage,
            quiz_percentage=concept_data.quiz_percentage,
            exercises_percentage=concept_data.exercises_percentage,
            bac_percentage=concept_data.bac_percentage,
            test_percentage=concept_data.test_percentage,
        )
        synced_counts["concepts"] += 1

    # Sync exercises
    for exercise_data in data.exercises:
        await cruds.save_exercise_attempt(
            db=db,
            user_id=current_user.id,
            exercise_id=exercise_data.exercise_id,
            concept_id=exercise_data.concept_id,
            chapter_id=exercise_data.chapter_id,
            student_answer=exercise_data.student_answer,
            is_correct=exercise_data.is_correct,
            score=exercise_data.score,
            time_spent_seconds=exercise_data.time_spent_seconds,
        )
        synced_counts["exercises"] += 1

    # Sync BAC exercises
    for bac_data in data.bac_exercises:
        await cruds.save_bac_attempt(
            db=db,
            user_id=current_user.id,
            bac_exercise_id=bac_data.bac_exercise_id,
            concept_id=bac_data.concept_id,
            chapter_id=bac_data.chapter_id,
            year=bac_data.year,
            stream=bac_data.stream,
            session=bac_data.session,
            student_answer=bac_data.student_answer,
            is_correct=bac_data.is_correct,
            score=bac_data.score,
            time_spent_seconds=bac_data.time_spent_seconds,
        )
        synced_counts["bac"] += 1

    # Sync quizzes
    for quiz_data in data.quizzes:
        await cruds.save_quiz_result(
            db=db,
            user_id=current_user.id,
            concept_id=quiz_data.concept_id,
            chapter_id=quiz_data.chapter_id,
            score=quiz_data.score,
            total=quiz_data.total,
            answers=quiz_data.answers,
            time_spent_seconds=quiz_data.time_spent_seconds,
        )
        synced_counts["quizzes"] += 1

    # Sync tests
    for test_data in data.tests:
        await cruds.save_test_result(
            db=db,
            user_id=current_user.id,
            test_id=test_data.test_id,
            concept_id=test_data.concept_id,
            chapter_id=test_data.chapter_id,
            score=test_data.score,
            total=test_data.total,
            problem_scores=test_data.problem_scores,
            time_spent_seconds=test_data.time_spent_seconds,
        )
        synced_counts["tests"] += 1

    # Sync preferences
    if data.preferences:
        await cruds.save_user_preferences(
            db=db,
            user_id=current_user.id,
            theme=data.preferences.theme,
            active_stream=data.preferences.active_stream,
            target_bac_score=data.preferences.target_bac_score,
            progress_weights=data.preferences.progress_weights,
            notifications_enabled=data.preferences.notifications_enabled,
        )
        synced_counts["preferences"] = True

    return BulkSyncResponse(
        synced_concepts=synced_counts["concepts"],
        synced_exercises=synced_counts["exercises"],
        synced_bac=synced_counts["bac"],
        synced_quizzes=synced_counts["quizzes"],
        synced_tests=synced_counts["tests"],
        synced_preferences=synced_counts["preferences"],
        message=f"Successfully synced all data to cloud. {synced_counts['concepts']} concepts, {synced_counts['exercises']} exercises, {synced_counts['bac']} BAC problems, {synced_counts['quizzes']} quizzes, {synced_counts['tests']} tests."
    )
