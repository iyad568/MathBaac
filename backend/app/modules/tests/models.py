from sqlalchemy import Column, String, Integer, Text, JSON, DateTime, ForeignKey
from app.db import Base
from datetime import datetime


class MiniTest(Base):
    __tablename__ = "mini_tests"

    id = Column(String(100), primary_key=True)
    concept_id = Column(String(100), ForeignKey("concepts.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    time_limit_minutes = Column(Integer, nullable=False, default=15)
    total_questions = Column(Integer, nullable=False, default=0)


class TestQuestion(Base):
    __tablename__ = "test_questions"

    id = Column(String(100), primary_key=True)
    test_id = Column(String(100), ForeignKey("mini_tests.id", ondelete="CASCADE"), nullable=False, index=True)
    concept_id = Column(String(100), nullable=False)
    chapter_id = Column(String(100), nullable=False)
    concept_name = Column(String(255), nullable=True)
    question_number = Column(Integer, default=1, nullable=False)
    question_text = Column(Text, nullable=False)
    question_math = Column(Text, nullable=True)
    options = Column(JSON, nullable=False)  # list[{id, text, mathTex}]
    correct_option_id = Column(String(100), nullable=False)
    explanation = Column(Text, nullable=True)
    explanation_math = Column(Text, nullable=True)


class TestResult(Base):
    __tablename__ = "test_results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    test_id = Column(String(100), ForeignKey("mini_tests.id", ondelete="CASCADE"), nullable=False, index=True)
    concept_id = Column(String(100), nullable=False)
    answers = Column(JSON, nullable=True)
    score = Column(Integer, nullable=False, default=0)
    total_questions = Column(Integer, nullable=False, default=0)
    time_spent_seconds = Column(Integer, nullable=True)
    concept_breakdown = Column(JSON, nullable=True)
    completed_at = Column(DateTime, default=datetime.utcnow, nullable=False)
