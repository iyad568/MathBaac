from sqlalchemy import Column, Integer, String, Text, DateTime, Float, ForeignKey, JSON
from sqlalchemy import Enum as SAEnum
from app.db import Base
from datetime import datetime


class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True, index=True)
    # Id used by the frontend's static data (e.g. "ex-1"); activity/progress rows reference it.
    external_id = Column(String(100), unique=True, nullable=True)
    chapter_id = Column(String(100), nullable=False, index=True)
    concept_id = Column(String(100), nullable=True, index=True)
    exercise_type = Column(
        SAEnum("exercise", "bac", name="exercise_type_enum"),
        nullable=False,
        default="exercise",
    )
    title = Column(String(255), nullable=True)
    number = Column(Integer, nullable=True)
    content = Column(Text, nullable=False)
    question_math = Column(Text, nullable=True)
    solution = Column(Text, nullable=True)
    # Auto-graded exercises
    answer_type = Column(String(30), nullable=True)
    options = Column(JSON, nullable=True)
    correct_answer = Column(Text, nullable=True)
    accepted_answers = Column(JSON, nullable=True)
    solution_steps = Column(JSON, nullable=True)
    explanation = Column(Text, nullable=True)
    hint = Column(Text, nullable=True)
    # BAC problems
    sub_questions = Column(JSON, nullable=True)
    official_solution = Column(JSON, nullable=True)
    difficulty = Column(
        SAEnum("easy", "medium", "hard", name="exercise_difficulty_enum"),
        nullable=True,
    )
    estimated_minutes = Column(Integer, nullable=True)
    points = Column(Float, nullable=True)
    bac_year = Column(Integer, nullable=True)
    bac_session = Column(String(20), nullable=True)
    bac_stream = Column(String(100), nullable=True)
    created_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
