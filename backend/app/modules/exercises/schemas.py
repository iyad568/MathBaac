from datetime import datetime
from typing import Any, Optional, Literal

from pydantic import BaseModel, Field


class ExerciseExtras(BaseModel):
    """Optional rich fields (answer keys, step-by-step solutions, BAC sub-questions)."""

    number: Optional[int] = None
    question_math: Optional[str] = None
    answer_type: Optional[str] = None
    options: Optional[list[Any]] = None
    correct_answer: Optional[str] = None
    accepted_answers: Optional[list[str]] = None
    solution_steps: Optional[list[dict[str, Any]]] = None
    explanation: Optional[str] = None
    hint: Optional[str] = None
    sub_questions: Optional[list[dict[str, Any]]] = None
    official_solution: Optional[dict[str, Any]] = None


class ExerciseCreate(ExerciseExtras):
    chapter_id: str
    concept_id: Optional[str] = None
    exercise_type: Literal["exercise", "bac"] = "exercise"
    title: Optional[str] = None
    content: str
    solution: Optional[str] = None
    difficulty: Optional[Literal["easy", "medium", "hard"]] = None
    estimated_minutes: Optional[int] = None
    points: Optional[float] = None
    bac_year: Optional[int] = None
    bac_session: Optional[Literal["Normal", "Rattrapage"]] = None
    bac_stream: Optional[str] = None


class ExerciseUpdate(ExerciseExtras):
    chapter_id: Optional[str] = None
    concept_id: Optional[str] = None
    exercise_type: Optional[Literal["exercise", "bac"]] = None
    title: Optional[str] = None
    content: Optional[str] = None
    solution: Optional[str] = None
    difficulty: Optional[Literal["easy", "medium", "hard"]] = None
    estimated_minutes: Optional[int] = None
    points: Optional[float] = None
    bac_year: Optional[int] = None
    bac_session: Optional[Literal["Normal", "Rattrapage"]] = None
    bac_stream: Optional[str] = None


class ExerciseResponse(ExerciseExtras):
    id: int
    external_id: Optional[str] = None
    chapter_id: str
    concept_id: Optional[str] = None
    exercise_type: str
    title: Optional[str] = None
    content: str
    solution: Optional[str] = None
    difficulty: Optional[str] = None
    estimated_minutes: Optional[int] = None
    points: Optional[float] = None
    bac_year: Optional[int] = None
    bac_session: Optional[str] = None
    bac_stream: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ExtractedText(BaseModel):
    filename: str
    text: str
    page_count: Optional[int] = None
    warning: Optional[str] = None


