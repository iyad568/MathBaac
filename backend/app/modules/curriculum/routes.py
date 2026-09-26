from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.dependencies import get_current_admin, get_current_user
from app.modules.curriculum import cruds
from app.modules.curriculum.schemas import (
    SubjectCreate, SubjectUpdate, SubjectResponse,
    ChapterCreate, ChapterUpdate, ChapterResponse,
    ConceptCreate, ConceptUpdate, ConceptResponse,
    LessonCreate, LessonUpdate, LessonResponse,
)

router = APIRouter(prefix="/curriculum", tags=["Curriculum"])


# ── Subjects ─────────────────────────────────────────────────────────────────

@router.get("/subjects", response_model=list[SubjectResponse])
async def list_subjects(db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)):
    return await cruds.list_subjects(db)


@router.post("/subjects", response_model=SubjectResponse, status_code=status.HTTP_201_CREATED)
async def create_subject(data: SubjectCreate, db: AsyncSession = Depends(get_db), current_admin=Depends(get_current_admin)):
    if await cruds.get_subject(db, data.id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Subject id already exists")
    return await cruds.create_subject(db, data.model_dump())


@router.put("/subjects/{subject_id}", response_model=SubjectResponse)
async def update_subject(subject_id: str, data: SubjectUpdate, db: AsyncSession = Depends(get_db), current_admin=Depends(get_current_admin)):
    subject = await cruds.get_subject(db, subject_id)
    if not subject:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subject not found")
    return await cruds.update_subject(db, subject, data.model_dump(exclude_unset=True))


@router.delete("/subjects/{subject_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_subject(subject_id: str, db: AsyncSession = Depends(get_db), current_admin=Depends(get_current_admin)):
    subject = await cruds.get_subject(db, subject_id)
    if not subject:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subject not found")
    await cruds.delete_subject(db, subject)


# ── Chapters ─────────────────────────────────────────────────────────────────

@router.get("/chapters", response_model=list[ChapterResponse])
async def list_chapters(subject_id: Optional[str] = None, db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)):
    return await cruds.list_chapters(db, subject_id)


@router.get("/chapters/{chapter_id}", response_model=ChapterResponse)
async def get_chapter(chapter_id: str, db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)):
    chapter = await cruds.get_chapter(db, chapter_id)
    if not chapter:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Chapter not found")
    return chapter


@router.post("/chapters", response_model=ChapterResponse, status_code=status.HTTP_201_CREATED)
async def create_chapter(data: ChapterCreate, db: AsyncSession = Depends(get_db), current_admin=Depends(get_current_admin)):
    if not await cruds.get_subject(db, data.subject_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="subject_id does not exist")
    if await cruds.get_chapter(db, data.id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Chapter id already exists")
    return await cruds.create_chapter(db, data.model_dump())


@router.put("/chapters/{chapter_id}", response_model=ChapterResponse)
async def update_chapter(chapter_id: str, data: ChapterUpdate, db: AsyncSession = Depends(get_db), current_admin=Depends(get_current_admin)):
    chapter = await cruds.get_chapter(db, chapter_id)
    if not chapter:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Chapter not found")
    return await cruds.update_chapter(db, chapter, data.model_dump(exclude_unset=True))


@router.delete("/chapters/{chapter_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_chapter(chapter_id: str, db: AsyncSession = Depends(get_db), current_admin=Depends(get_current_admin)):
    chapter = await cruds.get_chapter(db, chapter_id)
    if not chapter:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Chapter not found")
    await cruds.delete_chapter(db, chapter)


# ── Concepts ─────────────────────────────────────────────────────────────────

@router.get("/concepts", response_model=list[ConceptResponse])
async def list_concepts(chapter_id: Optional[str] = None, db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)):
    return await cruds.list_concepts(db, chapter_id)


@router.get("/concepts/{concept_id}", response_model=ConceptResponse)
async def get_concept(concept_id: str, db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)):
    concept = await cruds.get_concept(db, concept_id)
    if not concept:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Concept not found")
    return concept


@router.post("/concepts", response_model=ConceptResponse, status_code=status.HTTP_201_CREATED)
async def create_concept(data: ConceptCreate, db: AsyncSession = Depends(get_db), current_admin=Depends(get_current_admin)):
    if not await cruds.get_chapter(db, data.chapter_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="chapter_id does not exist")
    if await cruds.get_concept(db, data.id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Concept id already exists")
    return await cruds.create_concept(db, data.model_dump())


@router.put("/concepts/{concept_id}", response_model=ConceptResponse)
async def update_concept(concept_id: str, data: ConceptUpdate, db: AsyncSession = Depends(get_db), current_admin=Depends(get_current_admin)):
    concept = await cruds.get_concept(db, concept_id)
    if not concept:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Concept not found")
    return await cruds.update_concept(db, concept, data.model_dump(exclude_unset=True))


@router.delete("/concepts/{concept_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_concept(concept_id: str, db: AsyncSession = Depends(get_db), current_admin=Depends(get_current_admin)):
    concept = await cruds.get_concept(db, concept_id)
    if not concept:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Concept not found")
    await cruds.delete_concept(db, concept)


# ── Lessons ──────────────────────────────────────────────────────────────────

@router.get("/lessons/by-concept/{concept_id}", response_model=LessonResponse)
async def get_lesson_by_concept(concept_id: str, db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)):
    lesson = await cruds.get_lesson_by_concept(db, concept_id)
    if not lesson:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson not found")
    return lesson


@router.post("/lessons", response_model=LessonResponse, status_code=status.HTTP_201_CREATED)
async def create_lesson(data: LessonCreate, db: AsyncSession = Depends(get_db), current_admin=Depends(get_current_admin)):
    if not await cruds.get_concept(db, data.concept_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="concept_id does not exist")
    if await cruds.get_lesson_by_concept(db, data.concept_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Lesson already exists for this concept")
    return await cruds.create_lesson(db, data.model_dump())


@router.put("/lessons/{lesson_id}", response_model=LessonResponse)
async def update_lesson(lesson_id: str, data: LessonUpdate, db: AsyncSession = Depends(get_db), current_admin=Depends(get_current_admin)):
    lesson = await cruds.get_lesson_by_id(db, lesson_id)
    if not lesson:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson not found")
    return await cruds.update_lesson(db, lesson, data.model_dump(exclude_unset=True))


@router.delete("/lessons/{lesson_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_lesson(lesson_id: str, db: AsyncSession = Depends(get_db), current_admin=Depends(get_current_admin)):
    lesson = await cruds.get_lesson_by_id(db, lesson_id)
    if not lesson:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson not found")
    await cruds.delete_lesson(db, lesson)
