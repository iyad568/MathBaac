from sqlalchemy import Column, String, Integer, Text, JSON, Boolean, DateTime, ForeignKey
from app.db import Base
from datetime import datetime


class QuizQuestion(Base):
    __tablename__ = "quiz_questions"

    id = Column(String(100), primary_key=True)
    concept_id = Column(String(100), ForeignKey("concepts.id", ondelete="CASCADE"), nullable=False, index=True)
    question_number = Column(Integer, default=1, nullable=False)
    question_text = Column(Text, nullable=False)
    question_math = Column(Text, nullable=True)
    options = Column(JSON, nullable=False)  # list[{id, text, mathTex}]
    correct_option_id = Column(String(100), nullable=False)
    explanation = Column(Text, nullable=True)
    explanation_math = Column(Text, nullable=True)


class QuizSubmission(Base):
    __tablename__ = "quiz_submissions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    concept_id = Column(String(100), ForeignKey("concepts.id", ondelete="CASCADE"), nullable=False, index=True)
    answers = Column(JSON, nullable=True)  # list[{questionId, selectedOptionId, isCorrect}]
    score = Column(Integer, nullable=False, default=0)
    total = Column(Integer, nullable=False, default=0)
    time_spent_seconds = Column(Integer, nullable=True)
    submitted_at = Column(DateTime, default=datetime.utcnow, nullable=False)
