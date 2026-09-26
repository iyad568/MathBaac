from typing import Optional, Any
from datetime import datetime
from app.schemas_common import CamelModel


class TestQuestionCreate(CamelModel):
    id: str
    test_id: str
    concept_id: str
    chapter_id: str
    concept_name: Optional[str] = None
    question_number: int = 1
    question_text: str
    question_math: Optional[str] = None
    options: list[dict[str, Any]]
    correct_option_id: str
    explanation: Optional[str] = None
    explanation_math: Optional[str] = None


class TestQuestionResponse(TestQuestionCreate):
    pass


class TestQuestionPublic(CamelModel):
    id: str
    concept_id: str
    chapter_id: str
    concept_name: Optional[str] = None
    question_number: int
    question_text: str
    question_math: Optional[str] = None
    options: list[dict[str, Any]]


class MiniTestCreate(CamelModel):
    id: str
    concept_id: str
    title: str
    time_limit_minutes: int = 15
    total_questions: int = 0


class MiniTestUpdate(CamelModel):
    title: Optional[str] = None
    time_limit_minutes: Optional[int] = None
    total_questions: Optional[int] = None


class MiniTestResponse(MiniTestCreate):
    pass


class MiniTestWithQuestions(MiniTestResponse):
    questions: list[TestQuestionPublic] = []


class TestAnswerInput(CamelModel):
    """What the student actually picked — the backend looks up correctness itself."""
    question_id: str
    selected_option_id: Optional[str] = None


class TestResultCreate(CamelModel):
    test_id: str
    concept_id: str
    answers: list[TestAnswerInput]
    time_spent_seconds: Optional[int] = None


class TestResultResponse(CamelModel):
    id: int
    user_id: int
    test_id: str
    concept_id: str
    answers: Optional[list[dict[str, Any]]] = None
    score: int
    total_questions: int
    time_spent_seconds: Optional[int] = None
    concept_breakdown: Optional[list[dict[str, Any]]] = None
    completed_at: datetime
