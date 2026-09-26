from typing import Optional, List, Dict, Any
from app.schemas_common import CamelModel


class LessonCompleteRequest(CamelModel):
    concept_id: str
    video_watched_seconds: Optional[int] = None


class ConceptProgressResponse(CamelModel):
    concept_id: str
    chapter_id: str
    lesson_completed: bool
    video_watched_seconds: int = 0
    quiz_score: Optional[int] = None
    quiz_total: Optional[int] = None
    quiz_completed: bool = False
    exercises_solved_count: int = 0
    exercises_total_count: int = 0
    exercises_accuracy: int = 0
    bac_exercises_solved_count: int = 0
    bac_exercises_total_count: int = 0
    mini_test_score: Optional[int] = None
    mini_test_total: Optional[int] = None
    mini_test_completed: bool = False
    total_time_spent_seconds: int = 0
    overall_percentage: int = 0


class ChapterProgressResponse(CamelModel):
    chapter_id: str
    completed_concepts_count: int = 0
    total_concepts_count: int = 0
    average_mastery_percentage: int = 0
    total_exercises_solved: int = 0
    total_bac_solved: int = 0
    total_time_spent_minutes: int = 0


class UserStudyStatsResponse(CamelModel):
    total_study_time_minutes: int = 0
    streak_days: int = 0
    last_study_date: Optional[str] = None
    completed_lessons_count: int = 0
    solved_exercises_count: int = 0
    solved_bac_count: int = 0
    average_accuracy: int = 0
    overall_course_progress: int = 0
    stream: Optional[str] = None


# ==================== NEW SCHEMAS FOR COMPLETE DATA SYNC ====================

class SaveConceptProgressRequest(CamelModel):
    concept_id: str
    chapter_id: str
    overall_percentage: float
    lesson_percentage: float = 0.0
    quiz_percentage: float = 0.0
    exercises_percentage: float = 0.0
    bac_percentage: float = 0.0
    test_percentage: float = 0.0


class ConceptProgressData(CamelModel):
    concept_id: str
    chapter_id: str
    overall_percentage: float
    lesson_percentage: float
    quiz_percentage: float
    exercises_percentage: float
    bac_percentage: float
    test_percentage: float
    created_at: str
    updated_at: str


class SaveExerciseAttemptRequest(CamelModel):
    exercise_id: str
    concept_id: str
    chapter_id: str
    student_answer: str
    is_correct: bool
    score: int
    time_spent_seconds: Optional[int] = None


class ExerciseAttemptData(CamelModel):
    exercise_id: str
    concept_id: str
    chapter_id: str
    student_answer: str
    is_correct: bool
    score: int
    time_spent_seconds: Optional[int] = None
    created_at: str
    updated_at: str


class SaveBACAttemptRequest(CamelModel):
    bac_exercise_id: str
    concept_id: str
    chapter_id: str
    year: int
    stream: str
    session: str
    student_answer: str
    is_correct: bool
    score: int
    time_spent_seconds: Optional[int] = None


class BACAttemptData(CamelModel):
    bac_exercise_id: str
    concept_id: str
    chapter_id: str
    year: int
    stream: str
    session: str
    student_answer: str
    is_correct: bool
    score: int
    time_spent_seconds: Optional[int] = None
    created_at: str
    updated_at: str


class SaveQuizResultRequest(CamelModel):
    concept_id: str
    chapter_id: str
    score: int
    total: int
    answers: Dict[str, Any]
    time_spent_seconds: Optional[int] = None


class QuizResultData(CamelModel):
    concept_id: str
    chapter_id: str
    score: int
    total: int
    answers: Dict[str, Any]
    time_spent_seconds: Optional[int] = None
    created_at: str
    updated_at: str


class SaveTestResultRequest(CamelModel):
    test_id: str
    concept_id: str
    chapter_id: str
    score: int
    total: int
    problem_scores: Dict[str, int]
    time_spent_seconds: Optional[int] = None


class TestResultData(CamelModel):
    test_id: str
    concept_id: str
    chapter_id: str
    score: int
    total: int
    problem_scores: Dict[str, int]
    time_spent_seconds: Optional[int] = None
    created_at: str
    updated_at: str


class UserPreferencesData(CamelModel):
    theme: str = 'light'
    active_stream: str = 'شعبة العلوم التجريبية'
    target_bac_score: int = 15
    progress_weights: Dict[str, float] = {}
    notifications_enabled: bool = True


class UpdatePreferencesRequest(CamelModel):
    theme: Optional[str] = None
    active_stream: Optional[str] = None
    target_bac_score: Optional[int] = None
    progress_weights: Optional[Dict[str, float]] = None
    notifications_enabled: Optional[bool] = None


class AllProgressResponse(CamelModel):
    concepts: List[ConceptProgressData]
    exercises: List[ExerciseAttemptData]
    bac_exercises: List[BACAttemptData]
    quizzes: List[QuizResultData]
    tests: List[TestResultData]
    preferences: UserPreferencesData


class BulkSyncRequest(CamelModel):
    concepts: List[SaveConceptProgressRequest] = []
    exercises: List[SaveExerciseAttemptRequest] = []
    bac_exercises: List[SaveBACAttemptRequest] = []
    quizzes: List[SaveQuizResultRequest] = []
    tests: List[SaveTestResultRequest] = []
    preferences: Optional[UserPreferencesData] = None


class BulkSyncResponse(CamelModel):
    synced_concepts: int
    synced_exercises: int
    synced_bac: int
    synced_quizzes: int
    synced_tests: int
    synced_preferences: bool
    message: str
