from datetime import datetime
from typing import Optional

from app.schemas_common import CamelModel


class AdminUser(CamelModel):
    id: int
    full_name: str
    email: str
    stream: Optional[str] = None
    is_admin: bool
    created_at: Optional[datetime] = None
    activities_count: int = 0
    study_minutes: int = 0


class AdminUserUpdate(CamelModel):
    full_name: Optional[str] = None
    is_admin: Optional[bool] = None


class AdminStats(CamelModel):
    total_users: int
    total_admins: int
    new_users_last_7_days: int
    total_exercises: int
    total_bac_exercises: int
    total_activities: int
    total_community_posts: int
