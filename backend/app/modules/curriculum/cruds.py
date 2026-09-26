from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.curriculum.models import Subject, Chapter, Concept, Lesson


# ── Subject ──────────────────────────────────────────────────────────────────

async def create_subject(db: AsyncSession, data: dict) -> Subject:
    subject = Subject(**data)
    db.add(subject)
    await db.commit()
    await db.refresh(subject)
    return subject


async def get_subject(db: AsyncSession, subject_id: str) -> Optional[Subject]:
    result = await db.execute(select(Subject).where(Subject.id == subject_id))
    return result.scalars().first()


async def list_subjects(db: AsyncSession) -> list[Subject]:
    result = await db.execute(select(Subject))
    return list(result.scalars().all())


async def update_subject(db: AsyncSession, subject: Subject, data: dict) -> Subject:
    for field, value in data.items():
        setattr(subject, field, value)
    await db.commit()
    await db.refresh(subject)
    return subject


async def delete_subject(db: AsyncSession, subject: Subject) -> None:
    await db.delete(subject)
    await db.commit()


# ── Chapter ──────────────────────────────────────────────────────────────────

async def create_chapter(db: AsyncSession, data: dict) -> Chapter:
    chapter = Chapter(**data)
    db.add(chapter)
    await db.commit()
    await db.refresh(chapter)
    return chapter


async def get_chapter(db: AsyncSession, chapter_id: str) -> Optional[Chapter]:
    result = await db.execute(select(Chapter).where(Chapter.id == chapter_id))
    return result.scalars().first()


async def list_chapters(db: AsyncSession, subject_id: Optional[str] = None) -> list[Chapter]:
    query = select(Chapter)
    if subject_id is not None:
        query = query.where(Chapter.subject_id == subject_id)
    query = query.order_by(Chapter.order)
    result = await db.execute(query)
    return list(result.scalars().all())


async def update_chapter(db: AsyncSession, chapter: Chapter, data: dict) -> Chapter:
    for field, value in data.items():
        setattr(chapter, field, value)
    await db.commit()
    await db.refresh(chapter)
    return chapter


async def delete_chapter(db: AsyncSession, chapter: Chapter) -> None:
    await db.delete(chapter)
    await db.commit()


# ── Concept ──────────────────────────────────────────────────────────────────

async def create_concept(db: AsyncSession, data: dict) -> Concept:
    concept = Concept(**data)
    db.add(concept)
    await db.commit()
    await db.refresh(concept)
    return concept


async def get_concept(db: AsyncSession, concept_id: str) -> Optional[Concept]:
    result = await db.execute(select(Concept).where(Concept.id == concept_id))
    return result.scalars().first()


async def list_concepts(db: AsyncSession, chapter_id: Optional[str] = None) -> list[Concept]:
    query = select(Concept)
    if chapter_id is not None:
        query = query.where(Concept.chapter_id == chapter_id)
    query = query.order_by(Concept.order)
    result = await db.execute(query)
    return list(result.scalars().all())


async def update_concept(db: AsyncSession, concept: Concept, data: dict) -> Concept:
    for field, value in data.items():
        setattr(concept, field, value)
    await db.commit()
    await db.refresh(concept)
    return concept


async def delete_concept(db: AsyncSession, concept: Concept) -> None:
    await db.delete(concept)
    await db.commit()


# ── Lesson ───────────────────────────────────────────────────────────────────

async def create_lesson(db: AsyncSession, data: dict) -> Lesson:
    lesson = Lesson(**data)
    db.add(lesson)
    await db.commit()
    await db.refresh(lesson)
    return lesson


async def get_lesson_by_id(db: AsyncSession, lesson_id: str) -> Optional[Lesson]:
    result = await db.execute(select(Lesson).where(Lesson.id == lesson_id))
    return result.scalars().first()


async def get_lesson_by_concept(db: AsyncSession, concept_id: str) -> Optional[Lesson]:
    result = await db.execute(select(Lesson).where(Lesson.concept_id == concept_id))
    return result.scalars().first()


async def update_lesson(db: AsyncSession, lesson: Lesson, data: dict) -> Lesson:
    for field, value in data.items():
        setattr(lesson, field, value)
    await db.commit()
    await db.refresh(lesson)
    return lesson


async def delete_lesson(db: AsyncSession, lesson: Lesson) -> None:
    await db.delete(lesson)
    await db.commit()
