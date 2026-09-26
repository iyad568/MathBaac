from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import delete, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.dependencies import get_current_admin
from app.modules.admin.schemas import AdminStats, AdminUser, AdminUserUpdate
from app.modules.auth.cruds import get_user_by_id
from app.modules.auth.models import User
from app.modules.community.models import CommunityPost
from app.modules.dashboard.models import UserActivity
from app.modules.exercises.models import Exercise

router = APIRouter(prefix="/admin", tags=["Admin"])


async def _count(db: AsyncSession, *conditions, table=None) -> int:
    query = select(func.count()).select_from(table) if table is not None else select(func.count())
    for condition in conditions:
        query = query.where(condition)
    return (await db.execute(query)).scalar() or 0


def _to_admin_user(user: User, activities_count: int, study_seconds: int) -> AdminUser:
    return AdminUser(
        id=user.id,
        full_name=user.fullName,
        email=user.email,
        stream=user.stream,
        is_admin=user.is_admin,
        created_at=user.created_at,
        activities_count=activities_count,
        study_minutes=round(study_seconds / 60),
    )


@router.get("/stats", response_model=AdminStats)
async def get_stats(db: AsyncSession = Depends(get_db), current_admin=Depends(get_current_admin)):
    week_ago = datetime.utcnow() - timedelta(days=7)
    return AdminStats(
        total_users=await _count(db, table=User),
        total_admins=await _count(db, User.is_admin == True, table=User),
        new_users_last_7_days=await _count(db, User.created_at >= week_ago, table=User),
        total_exercises=await _count(db, Exercise.exercise_type == "exercise", table=Exercise),
        total_bac_exercises=await _count(db, Exercise.exercise_type == "bac", table=Exercise),
        total_activities=await _count(db, table=UserActivity),
        total_community_posts=await _count(db, table=CommunityPost),
    )


@router.get("/users", response_model=list[AdminUser])
async def list_users(
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    query = (
        select(
            User,
            func.count(UserActivity.id),
            func.coalesce(func.sum(UserActivity.time_spent_seconds), 0),
        )
        .outerjoin(UserActivity, UserActivity.user_id == User.id)
        .group_by(User.id)
        .order_by(User.created_at.desc())
    )
    if search:
        pattern = f"%{search.strip()}%"
        query = query.where(User.email.ilike(pattern) | User.fullName.ilike(pattern))
    rows = (await db.execute(query)).all()
    return [_to_admin_user(user, int(count), int(seconds)) for user, count, seconds in rows]


@router.put("/users/{user_id}", response_model=AdminUser)
async def update_user(
    user_id: int,
    data: AdminUserUpdate,
    db: AsyncSession = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if data.is_admin is False and user.id == current_admin.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You cannot remove your own admin access")

    changes = data.model_dump(exclude_unset=True)
    if "full_name" in changes and changes["full_name"]:
        user.fullName = changes["full_name"].strip()
    if "is_admin" in changes and changes["is_admin"] is not None:
        user.is_admin = changes["is_admin"]
    await db.commit()
    await db.refresh(user)
    return _to_admin_user(user, 0, 0)


@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    if user_id == current_admin.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You cannot delete your own account")
    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    # Core DELETE: related rows are removed by the database's ON DELETE CASCADE foreign keys.
    await db.execute(delete(User).where(User.id == user_id))
    await db.commit()
