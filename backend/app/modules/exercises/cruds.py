from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.exercises.models import Exercise
from app.modules.exercises.schemas import ExerciseCreate, ExerciseUpdate


async def create_exercise(db: AsyncSession, data: ExerciseCreate, created_by: int) -> Exercise:
    exercise = Exercise(**data.model_dump(), created_by=created_by)
    db.add(exercise)
    await db.commit()
    await db.refresh(exercise)
    return exercise


async def get_exercise(db: AsyncSession, exercise_id: int) -> Optional[Exercise]:
    result = await db.execute(select(Exercise).where(Exercise.id == exercise_id))
    return result.scalars().first()


async def list_exercises(
    db: AsyncSession,
    chapter_id: Optional[str] = None,
    concept_id: Optional[str] = None,
    exercise_type: Optional[str] = None,
    difficulty: Optional[str] = None,
) -> list[Exercise]:
    query = select(Exercise)
    if chapter_id is not None:
        query = query.where(Exercise.chapter_id == chapter_id)
    if concept_id is not None:
        query = query.where(Exercise.concept_id == concept_id)
    if exercise_type is not None:
        query = query.where(Exercise.exercise_type == exercise_type)
    if difficulty is not None:
        query = query.where(Exercise.difficulty == difficulty)
    query = query.order_by(Exercise.id)
    result = await db.execute(query)
    return list(result.scalars().all())


async def update_exercise(db: AsyncSession, exercise: Exercise, data: ExerciseUpdate) -> Exercise:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(exercise, field, value)
    await db.commit()
    await db.refresh(exercise)
    return exercise


async def delete_exercise(db: AsyncSession, exercise: Exercise) -> None:
    await db.delete(exercise)
    await db.commit()
