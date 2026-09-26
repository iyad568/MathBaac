from typing import Optional, Any
from datetime import datetime
from app.schemas_common import CamelModel


class QuizQuestionCreate(CamelModel):
    id: str
    concept_id: str
    question_number: int = 1
    question_text: str
    question_math: Optional[str] = None
    options: list[dict[str, Any]]
    correct_option_id: str
    explanation: Optional[str] = None
    explanation_math: Optional[str] = None


class QuizQuestionUpdate(CamelModel):
    question_number: Optional[int] = None
    question_text: Optional[str] = None
    question_math: Optional[str] = None
    options: Optional[list[dict[str, Any]]] = None
    correct_option_id: Optional[str] = None
    explanation: Optional[str] = None
    explanation_math: Optional[str] = None


class QuizQuestionResponse(QuizQuestionCreate):
    pass


class QuizQuestionPublic(CamelModel):
    """Question shape without the answer key, for students taking the quiz."""
    id: str
    concept_id: str
    question_number: int
    question_text: str
    question_math: Optional[str] = None
    options: list[dict[str, Any]]


class QuizAnswerInput(CamelModel):
    """What the student actually picked — the backend looks up correctness itself."""
    question_id: str
    selected_option_id: Optional[str] = None


class QuizSubmissionCreate(CamelModel):
    concept_id: str
    answers: list[QuizAnswerInput]
    time_spent_seconds: Optional[int] = None


class QuizSubmissionResponse(CamelModel):
    id: int
    user_id: int
    concept_id: str
    answers: Optional[list[dict[str, Any]]] = None
    score: int
    total: int
    time_spent_seconds: Optional[int] = None
    submitted_at: datetime
