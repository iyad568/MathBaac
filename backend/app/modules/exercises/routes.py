from typing import Optional

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.dependencies import get_current_admin, get_current_user
from app.modules.exercises import cruds
from app.modules.exercises.extraction import UnsupportedFileType, extract_text
from app.modules.exercises.schemas import (
    ExerciseCreate,
    ExerciseResponse,
    ExerciseUpdate,
    ExtractedText,
)

router = APIRouter(prefix="/exercises", tags=["Exercises"])

MAX_UPLOAD_BYTES = 10 * 1024 * 1024


@router.post("/extract-text", response_model=ExtractedText)
async def extract_text_from_file(
    file: UploadFile = File(...),
    current_admin=Depends(get_current_admin),
):
    """Upload a PDF/DOCX/TXT and get its text back to review, then save it via POST /exercises."""
    content = await file.read()
    if len(content) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail="File exceeds 10 MB")
    try:
        text, page_count = extract_text(file.filename or "", content)
    except UnsupportedFileType as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(error))
    except Exception:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Could not read this file")

    warning = None
    if not text:
        warning = "No text found. This looks like a scanned/image-only file, which needs OCR."
    return ExtractedText(filename=file.filename or "", text=text, page_count=page_count, warning=warning)


@router.get("/", response_model=list[ExerciseResponse])
async def list_exercises(
    chapter_id: Optional[str] = None,
    concept_id: Optional[str] = None,
    exercise_type: Optional[str] = None,
    difficulty: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Returns full exercise content (not just the lean list-table shape) — the
    student-facing pages render every exercise inline, with no separate detail fetch."""
    return await cruds.list_exercises(db, chapter_id, concept_id, exercise_type, difficulty)


@router.get("/{exercise_id}", response_model=ExerciseResponse)
async def get_exercise(
    exercise_id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    exercise = await cruds.get_exercise(db, exercise_id)
    if not exercise:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Exercise not found")
    return exercise


@router.post("/", response_model=ExerciseResponse, status_code=status.HTTP_201_CREATED)
async def create_exercise(
    data: ExerciseCreate,
    db: AsyncSession = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    return await cruds.create_exercise(db, data, created_by=current_admin.id)


@router.put("/{exercise_id}", response_model=ExerciseResponse)
async def update_exercise(
    exercise_id: int,
    data: ExerciseUpdate,
    db: AsyncSession = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    exercise = await cruds.get_exercise(db, exercise_id)
    if not exercise:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Exercise not found")
    return await cruds.update_exercise(db, exercise, data)


@router.delete("/{exercise_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_exercise(
    exercise_id: int,
    db: AsyncSession = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    exercise = await cruds.get_exercise(db, exercise_id)
    if not exercise:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Exercise not found")
    await cruds.delete_exercise(db, exercise)
