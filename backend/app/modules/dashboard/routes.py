from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import get_db
from app.dependencies import get_current_user
from app.modules.dashboard import cruds, services
from app.modules.dashboard.schemas import (
    DashboardStats,
    StudyStreakResponse,
    UserActivityCreate,
)

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/", response_model=DashboardStats)
async def get_dashboard(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Full dashboard aggregate: streak, progress, exercise stats, recent sessions."""
    return await services.get_full_dashboard(db, current_user.id)


@router.get("/streak", response_model=StudyStreakResponse)
async def get_streak(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await cruds.get_or_create_streak(db, current_user.id)


@router.post("/activity", status_code=status.HTTP_201_CREATED)
async def log_activity(
    data: UserActivityCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        activity = await cruds.record_activity(db, current_user.id, data)
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(error))
    await cruds.update_streak(db, current_user.id)
    return {"id": activity.id, "activity_type": activity.activity_type, "external_id": activity.external_id}
