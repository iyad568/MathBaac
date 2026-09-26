from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.dependencies import get_current_admin, get_current_user
from app.modules.quizzes import cruds
from app.modules.quizzes.schemas import (
    QuizQuestionCreate,
    QuizQuestionUpdate,
    QuizQuestionResponse,
    QuizQuestionPublic,
    QuizSubmissionCreate,
    QuizSubmissionResponse,
)

router = APIRouter(prefix="/quizzes", tags=["Quizzes"])


@router.get("/questions", response_model=list[QuizQuestionPublic])
async def list_questions(
    concept_id: str,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Student-facing: returns questions WITHOUT the correct answer / explanation."""
    return await cruds.list_questions(db, concept_id)


@router.get("/questions/admin", response_model=list[QuizQuestionResponse])
async def list_questions_admin(
    concept_id: str,
    db: AsyncSession = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    """Admin-facing: includes the answer key."""
    return await cruds.list_questions(db, concept_id)


@router.post("/questions", response_model=QuizQuestionResponse, status_code=status.HTTP_201_CREATED)
async def create_question(
    data: QuizQuestionCreate,
    db: AsyncSession = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    if await cruds.get_question(db, data.id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Question id already exists")
    return await cruds.create_question(db, data.model_dump())


@router.put("/questions/{question_id}", response_model=QuizQuestionResponse)
async def update_question(
    question_id: str,
    data: QuizQuestionUpdate,
    db: AsyncSession = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    question = await cruds.get_question(db, question_id)
    if not question:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question not found")
    return await cruds.update_question(db, question, data.model_dump(exclude_unset=True))


@router.delete("/questions/{question_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_question(
    question_id: str,
    db: AsyncSession = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    question = await cruds.get_question(db, question_id)
    if not question:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question not found")
    await cruds.delete_question(db, question)


@router.post("/submissions", response_model=QuizSubmissionResponse, status_code=status.HTTP_201_CREATED)
async def submit_quiz(
    data: QuizSubmissionCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await cruds.create_submission(
        db,
        current_user.id,
        data.concept_id,
        [answer.model_dump() for answer in data.answers],
        data.time_spent_seconds,
    )


@router.get("/submissions/latest", response_model=QuizSubmissionResponse)
async def get_latest_submission(
    concept_id: str,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    submission = await cruds.get_latest_submission(db, current_user.id, concept_id)
    if not submission:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No submission found")
    return submission


@router.get("/submissions", response_model=list[QuizSubmissionResponse])
async def list_submissions(
    concept_id: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await cruds.list_submissions(db, current_user.id, concept_id)
