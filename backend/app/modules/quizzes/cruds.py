from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.quizzes.models import QuizQuestion, QuizSubmission


async def create_question(db: AsyncSession, data: dict) -> QuizQuestion:
    question = QuizQuestion(**data)
    db.add(question)
    await db.commit()
    await db.refresh(question)
    return question


async def get_question(db: AsyncSession, question_id: str) -> Optional[QuizQuestion]:
    result = await db.execute(select(QuizQuestion).where(QuizQuestion.id == question_id))
    return result.scalars().first()


async def list_questions(db: AsyncSession, concept_id: str) -> list[QuizQuestion]:
    result = await db.execute(
        select(QuizQuestion).where(QuizQuestion.concept_id == concept_id).order_by(QuizQuestion.question_number)
    )
    return list(result.scalars().all())


async def update_question(db: AsyncSession, question: QuizQuestion, data: dict) -> QuizQuestion:
    for field, value in data.items():
        setattr(question, field, value)
    await db.commit()
    await db.refresh(question)
    return question


async def delete_question(db: AsyncSession, question: QuizQuestion) -> None:
    await db.delete(question)
    await db.commit()


async def create_submission(
    db: AsyncSession,
    user_id: int,
    concept_id: str,
    answers: list[dict],
    time_spent_seconds: Optional[int],
) -> QuizSubmission:
    """Grades the quiz server-side against the stored answer key, ignoring any
    score the client might have sent — the client never receives correct_option_id
    until after this runs."""
    questions = await list_questions(db, concept_id)
    question_by_id = {question.id: question for question in questions}

    graded_answers = []
    score = 0
    for answer in answers:
        question = question_by_id.get(answer["question_id"])
        if question is None:
            continue
        selected_option_id = answer.get("selected_option_id")
        is_correct = selected_option_id is not None and selected_option_id == question.correct_option_id
        if is_correct:
            score += 1
        graded_answers.append(
            {
                "questionId": question.id,
                "selectedOptionId": selected_option_id,
                "isCorrect": is_correct,
                "correctOptionId": question.correct_option_id,
                "explanation": question.explanation,
                "explanationMath": question.explanation_math,
            }
        )

    submission = QuizSubmission(
        user_id=user_id,
        concept_id=concept_id,
        answers=graded_answers,
        score=score,
        total=len(questions),
        time_spent_seconds=time_spent_seconds,
    )
    db.add(submission)
    await db.commit()
    await db.refresh(submission)
    return submission


async def get_latest_submission(db: AsyncSession, user_id: int, concept_id: str) -> Optional[QuizSubmission]:
    result = await db.execute(
        select(QuizSubmission)
        .where(QuizSubmission.user_id == user_id, QuizSubmission.concept_id == concept_id)
        .order_by(QuizSubmission.submitted_at.desc())
    )
    return result.scalars().first()


async def list_submissions(db: AsyncSession, user_id: int, concept_id: Optional[str] = None) -> list[QuizSubmission]:
    query = select(QuizSubmission).where(QuizSubmission.user_id == user_id)
    if concept_id is not None:
        query = query.where(QuizSubmission.concept_id == concept_id)
    query = query.order_by(QuizSubmission.submitted_at.desc())
    result = await db.execute(query)
    return list(result.scalars().all())
