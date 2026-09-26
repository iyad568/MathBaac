from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Boolean, JSON, Text, UniqueConstraint
from sqlalchemy.orm import relationship
from app.db import Base
from datetime import datetime


class LessonCompletion(Base):
    """Stores lesson completion status (original model)"""
    __tablename__ = "lesson_completions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    concept_id = Column(String(100), nullable=False, index=True)
    video_watched_seconds = Column(Integer, default=0, nullable=False)
    completed_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class ConceptProgress(Base):
    """Stores user progress for each concept"""
    __tablename__ = "concept_progress"
    __table_args__ = (
        UniqueConstraint("user_id", "concept_id", name="uq_concept_progress"),
    )

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    concept_id = Column(String(100), nullable=False, index=True)
    chapter_id = Column(String(100), nullable=False, index=True)
    
    # Progress percentages
    overall_percentage = Column(Float, default=0.0, nullable=False)
    lesson_percentage = Column(Float, default=0.0, nullable=False)
    quiz_percentage = Column(Float, default=0.0, nullable=False)
    exercises_percentage = Column(Float, default=0.0, nullable=False)
    bac_percentage = Column(Float, default=0.0, nullable=False)
    test_percentage = Column(Float, default=0.0, nullable=False)
    
    # Completion flags
    lesson_completed = Column(Boolean, default=False, nullable=False)
    video_watched_seconds = Column(Integer, default=0, nullable=False)
    
    # Statistics
    time_spent_minutes = Column(Integer, default=0, nullable=False)
    last_accessed_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


class ExerciseAttempt(Base):
    """Stores user attempts at exercises"""
    __tablename__ = "exercise_attempts"
    __table_args__ = (
        UniqueConstraint("user_id", "exercise_id", name="uq_exercise_attempt"),
    )

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    exercise_id = Column(String(100), nullable=False, index=True)
    concept_id = Column(String(100), nullable=False, index=True)
    chapter_id = Column(String(100), nullable=False, index=True)
    
    # Attempt details
    is_correct = Column(Boolean, nullable=True)
    user_answer = Column(Text, nullable=True)
    score = Column(Float, nullable=True)
    time_spent_seconds = Column(Integer, default=0, nullable=False)
    attempts_count = Column(Integer, default=1, nullable=False)
    hints_used = Column(Integer, default=0, nullable=False)
    
    # Status
    completed = Column(Boolean, default=False, nullable=False)
    
    completed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


class BACExerciseAttempt(Base):
    """Stores user attempts at BAC exam problems"""
    __tablename__ = "bac_exercise_attempts"
    __table_args__ = (
        UniqueConstraint("user_id", "bac_exercise_id", name="uq_bac_exercise_attempt"),
    )

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    bac_exercise_id = Column(String(100), nullable=False, index=True)
    concept_id = Column(String(100), nullable=False, index=True)
    chapter_id = Column(String(100), nullable=False, index=True)
    
    # BAC specific
    year = Column(Integer, nullable=False)
    stream = Column(String(50), nullable=False)
    session = Column(String(50), nullable=False)
    
    # Attempt details
    score = Column(Float, nullable=True)
    max_score = Column(Float, nullable=True)
    time_spent_seconds = Column(Integer, default=0, nullable=False)
    user_solution = Column(Text, nullable=True)
    
    # Status
    completed = Column(Boolean, default=False, nullable=False)
    
    completed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


class QuizResult(Base):
    """Stores quiz results for each concept"""
    __tablename__ = "quiz_results"
    __table_args__ = (
        UniqueConstraint("user_id", "concept_id", name="uq_quiz_result"),
    )

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    concept_id = Column(String(100), nullable=False, index=True)
    chapter_id = Column(String(100), nullable=False, index=True)
    
    # Quiz details
    total_questions = Column(Integer, nullable=False)
    correct_answers = Column(Integer, nullable=False)
    score_percentage = Column(Float, nullable=False)
    time_spent_seconds = Column(Integer, default=0, nullable=False)
    
    # Store answers (JSON)
    user_answers = Column(JSON, nullable=True)
    
    completed_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


class UserPreferences(Base):
    """Stores user preferences and settings"""
    __tablename__ = "user_preferences"
    __table_args__ = (
        UniqueConstraint("user_id", name="uq_user_preferences"),
    )

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    
    # Preferences
    theme = Column(String(20), default="light", nullable=False)  # light or dark
    active_stream = Column(String(100), nullable=True)
    target_bac_score = Column(Float, default=19.0, nullable=False)
    
    # Progress calculation weights (JSON)
    progress_weights = Column(JSON, nullable=True)
    
    # Notifications
    notifications_enabled = Column(Boolean, default=True, nullable=False)
    email_notifications = Column(Boolean, default=False, nullable=False)
    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
