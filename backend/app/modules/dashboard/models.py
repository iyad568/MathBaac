from sqlalchemy import Column, Integer, DateTime, Date, ForeignKey, Boolean, String, UniqueConstraint
from sqlalchemy.orm import relationship
from app.db import Base
from datetime import datetime, date


class StudyStreak(Base):
    __tablename__ = "study_streaks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    current_streak = Column(Integer, default=0, nullable=False)
    longest_streak = Column(Integer, default=0, nullable=False)
    last_study_date = Column(Date, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=True)

    user = relationship("User", back_populates="study_streak")


class UserActivity(Base):
    __tablename__ = "user_activities"
    __table_args__ = (
        UniqueConstraint("user_id", "activity_type", "external_id", name="uq_user_activity"),
    )

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    activity_type = Column(String(20), nullable=False)
    external_id = Column(String(255), nullable=False)
    is_correct = Column(Boolean, nullable=True)
    completed = Column(Boolean, nullable=False, default=False)
    time_spent_seconds = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="activities")
