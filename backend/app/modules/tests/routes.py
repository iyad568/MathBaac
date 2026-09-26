from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.dependencies import get_current_admin, get_current_user
from app.modules.tests import cruds
from app.modules.tests.schemas import (
    MiniTestCreate,
    MiniTestUpdate,
    MiniTestResponse,
    MiniTestWithQuestions,
    TestQuestionCreate,
    TestQuestionResponse,
    TestResultCreate,
    TestResultResponse,
)

router = APIRouter(prefix="/tests", tags=["Mini Tests"])


@router.get("/", response_model=list[MiniTestResponse])
async def list_tests(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Lean list (no questions) for the tests library page."""
    return await cruds.list_mini_tests(db)


@router.get("/by-concept/{concept_id}", response_model=MiniTestWithQuestions)
async def get_test_by_concept(
    concept_id: str,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    test = await cruds.get_mini_test_by_concept(db, concept_id)
    if not test:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Test not found")
    questions = await cruds.list_questions_for_test(db, test.id)
    return MiniTestWithQuestions(
        id=test.id,
        concept_id=test.concept_id,
        title=test.title,
        time_limit_minutes=test.time_limit_minutes,
        total_questions=test.total_questions,
        questions=questions,
    )


@router.post("/", response_model=MiniTestResponse, status_code=status.HTTP_201_CREATED)
async def create_mini_test(
    data: MiniTestCreate,
    db: AsyncSession = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    if await cruds.get_mini_test(db, data.id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Test id already exists")
    return await cruds.create_mini_test(db, data.model_dump())


@router.put("/{test_id}", response_model=MiniTestResponse)
async def update_mini_test(
    test_id: str,
    data: MiniTestUpdate,
    db: AsyncSession = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    test = await cruds.get_mini_test(db, test_id)
    if not test:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Test not found")
    return await cruds.update_mini_test(db, test, data.model_dump(exclude_unset=True))


@router.delete("/{test_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_mini_test(
    test_id: str,
    db: AsyncSession = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    test = await cruds.get_mini_test(db, test_id)
    if not test:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Test not found")
    await cruds.delete_mini_test(db, test)


@router.post("/questions", response_model=TestQuestionResponse, status_code=status.HTTP_201_CREATED)
async def create_question(
    data: TestQuestionCreate,
    db: AsyncSession = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    if not await cruds.get_mini_test(db, data.test_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="test_id does not exist")
    if await cruds.get_question(db, data.id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Question id already exists")
    return await cruds.create_question(db, data.model_dump())


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


@router.post("/results", response_model=TestResultResponse, status_code=status.HTTP_201_CREATED)
async def submit_result(
    data: TestResultCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await cruds.create_result(
        db,
        current_user.id,
        data.test_id,
        data.concept_id,
        [answer.model_dump() for answer in data.answers],
        data.time_spent_seconds,
    )


@router.get("/results", response_model=list[TestResultResponse])
async def list_results(
    concept_id: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await cruds.list_results(db, current_user.id, concept_id)
