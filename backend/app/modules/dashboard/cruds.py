from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.modules.dashboard.models import StudyStreak, UserActivity
from app.modules.dashboard.schemas import UserActivityCreate
from app.modules.quizzes.models import QuizSubmission
from app.modules.tests.models import TestResult
from datetime import datetime, date
from typing import Optional


async def get_or_create_streak(db: AsyncSession, user_id: int) -> StudyStreak:
    result = await db.execute(select(StudyStreak).where(StudyStreak.user_id == user_id))
    streak = result.scalars().first()
    if not streak:
        streak = StudyStreak(
            user_id=user_id,
            current_streak=0,
            longest_streak=0,
        )
        db.add(streak)
        await db.commit()
        await db.refresh(streak)
    return streak


async def update_streak(db: AsyncSession, user_id: int) -> StudyStreak:
    streak = await get_or_create_streak(db, user_id)
    today = date.today()

    if streak.last_study_date:
        delta = (today - streak.last_study_date).days
        if delta == 0:
            pass                        # already logged today
        elif delta == 1:
            streak.current_streak += 1
            streak.last_study_date = today
        else:
            streak.current_streak = 1   # streak broken
            streak.last_study_date = today
    else:
        streak.current_streak = 1
        streak.last_study_date = today

    if streak.current_streak > streak.longest_streak:
        streak.longest_streak = streak.current_streak

    streak.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(streak)
    return streak


async def record_activity(
    db: AsyncSession, user_id: int, data: UserActivityCreate
) -> UserActivity:
    if data.activity_type not in {"exercise", "bac"}:
        raise ValueError("activity_type must be exercise or bac")

    result = await db.execute(
        select(UserActivity).where(
            UserActivity.user_id == user_id,
            UserActivity.activity_type == data.activity_type,
            UserActivity.external_id == data.external_id,
        )
    )
    activity = result.scalars().first()
    if activity:
        activity.is_correct = data.is_correct
        activity.completed = data.completed
        activity.time_spent_seconds = data.time_spent_seconds
        activity.updated_at = datetime.utcnow()
    else:
        activity = UserActivity(user_id=user_id, **data.model_dump())
        db.add(activity)
    await db.commit()
    await db.refresh(activity)
    return activity


async def get_dashboard_data(db: AsyncSession, user_id: int) -> dict:
    from app.modules.auth.models import User

    user_res = await db.execute(select(User).where(User.id == user_id))
    user = user_res.scalars().first()

    streak = await get_or_create_streak(db, user_id)

    activity_seconds = (
        await db.execute(
            select(func.coalesce(func.sum(UserActivity.time_spent_seconds), 0)).where(
                UserActivity.user_id == user_id
            )
        )
    ).scalar() or 0
    quiz_seconds = (
        await db.execute(
            select(func.coalesce(func.sum(QuizSubmission.time_spent_seconds), 0)).where(
                QuizSubmission.user_id == user_id
            )
        )
    ).scalar() or 0
    test_seconds = (
        await db.execute(
            select(func.coalesce(func.sum(TestResult.time_spent_seconds), 0)).where(
                TestResult.user_id == user_id
            )
        )
    ).scalar() or 0
    total_study_minutes = round((int(activity_seconds) + int(quiz_seconds) + int(test_seconds)) / 60)

    activity_exercises = (
        await db.execute(
            select(func.count()).where(
                UserActivity.user_id == user_id,
                UserActivity.activity_type == "exercise",
                UserActivity.completed == True,
            )
        )
    ).scalar() or 0

    activity_bac = (
        await db.execute(
            select(func.count()).where(
                UserActivity.user_id == user_id,
                UserActivity.activity_type == "bac",
                UserActivity.completed == True,
            )
        )
    ).scalar() or 0

    activity_correct = (
        await db.execute(
            select(func.count()).where(
                UserActivity.user_id == user_id,
                UserActivity.activity_type == "exercise",
                UserActivity.completed == True,
                UserActivity.is_correct == True,
            )
        )
    ).scalar() or 0

    total_exercise_attempts = int(activity_exercises)
    total_exercises_correct = int(activity_correct)
    solved_exercises_count = int(activity_exercises)
    solved_bac_count = int(activity_bac)
    overall_completion = 0.0

    average_accuracy = (
        round((total_exercises_correct / total_exercise_attempts * 100), 2)
        if total_exercise_attempts > 0
        else 0.0
    )

    return {
        "user_id": user_id,
        "fullName": user.fullName if user else "",
        "current_streak": streak.current_streak,
        "longest_streak": streak.longest_streak,
        "last_study_date": streak.last_study_date,
        "total_study_time_minutes": int(total_study_minutes),
        "total_exercises_attempted": int(total_exercise_attempts),
        "total_exercises_correct": int(total_exercises_correct),
        "solved_exercises_count": int(solved_exercises_count),
        "solved_bac_count": int(solved_bac_count),
        "accuracy_rate": average_accuracy,
        "average_accuracy": average_accuracy,
        "overall_completion": round(overall_completion, 2),
        "overall_course_progress": round(overall_completion, 2),
        "recent_sessions": [],
    }
