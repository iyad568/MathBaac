from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, date


# ── Streak schemas ─────────────────────────────────────────────────────────────

class StudyStreakResponse(BaseModel):
    id: int
    user_id: int
    current_streak: int
    longest_streak: int
    last_study_date: Optional[date] = None

    class Config:
        from_attributes = True


class UserActivityCreate(BaseModel):
    activity_type: str
    external_id: str
    is_correct: Optional[bool] = None
    completed: bool = False
    time_spent_seconds: Optional[int] = None


# ── Dashboard aggregate ────────────────────────────────────────────────────────

class DashboardStats(BaseModel):
    user_id: int
    fullName: str
    current_streak: int
    longest_streak: int
    last_study_date: Optional[date] = None
    total_study_time_minutes: int = 0
    total_exercises_attempted: int = 0
    total_exercises_correct: int = 0
    solved_exercises_count: int = 0
    solved_bac_count: int = 0
    accuracy_rate: float = 0.0
    average_accuracy: float = 0.0
    overall_completion: float = 0.0
    overall_course_progress: float = 0.0
    recent_sessions: List[dict] = []
