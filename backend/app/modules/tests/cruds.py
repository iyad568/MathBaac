from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.tests.models import MiniTest, TestQuestion, TestResult


async def create_mini_test(db: AsyncSession, data: dict) -> MiniTest:
    test = MiniTest(**data)
    db.add(test)
    await db.commit()
    await db.refresh(test)
    return test


async def get_mini_test(db: AsyncSession, test_id: str) -> Optional[MiniTest]:
    result = await db.execute(select(MiniTest).where(MiniTest.id == test_id))
    return result.scalars().first()


async def get_mini_test_by_concept(db: AsyncSession, concept_id: str) -> Optional[MiniTest]:
    result = await db.execute(select(MiniTest).where(MiniTest.concept_id == concept_id))
    return result.scalars().first()


async def list_mini_tests(db: AsyncSession) -> list[MiniTest]:
    result = await db.execute(select(MiniTest).order_by(MiniTest.id))
    return list(result.scalars().all())


async def update_mini_test(db: AsyncSession, test: MiniTest, data: dict) -> MiniTest:
    for field, value in data.items():
        setattr(test, field, value)
    await db.commit()
    await db.refresh(test)
    return test


async def delete_mini_test(db: AsyncSession, test: MiniTest) -> None:
    await db.delete(test)
    await db.commit()


async def create_question(db: AsyncSession, data: dict) -> TestQuestion:
    question = TestQuestion(**data)
    db.add(question)
    await db.commit()
    await db.refresh(question)
    return question


async def get_question(db: AsyncSession, question_id: str) -> Optional[TestQuestion]:
    result = await db.execute(select(TestQuestion).where(TestQuestion.id == question_id))
    return result.scalars().first()


async def list_questions_for_test(db: AsyncSession, test_id: str) -> list[TestQuestion]:
    result = await db.execute(
        select(TestQuestion).where(TestQuestion.test_id == test_id).order_by(TestQuestion.question_number)
    )
    return list(result.scalars().all())


async def delete_question(db: AsyncSession, question: TestQuestion) -> None:
    await db.delete(question)
    await db.commit()


async def create_result(
    db: AsyncSession,
    user_id: int,
    test_id: str,
    concept_id: str,
    answers: list[dict],
    time_spent_seconds: Optional[int],
) -> TestResult:
    """Grades the test server-side against the stored answer key, ignoring any
    score the client might have sent — the client never receives correct_option_id
    until after this runs. Also builds the per-sub-concept diagnostic breakdown here
    instead of trusting a client-computed one."""
    questions = await list_questions_for_test(db, test_id)
    question_by_id = {question.id: question for question in questions}

    graded_answers = []
    score = 0
    breakdown_map: dict[str, dict[str, int]] = {}
    for answer in answers:
        question = question_by_id.get(answer["question_id"])
        if question is None:
            continue
        selected_option_id = answer.get("selected_option_id")
        is_correct = selected_option_id is not None and selected_option_id == question.correct_option_id
        if is_correct:
            score += 1

        concept_name = question.concept_name or "قواعد عامة"
        bucket = breakdown_map.setdefault(concept_name, {"total": 0, "correct": 0})
        bucket["total"] += 1
        if is_correct:
            bucket["correct"] += 1

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

    concept_breakdown = [
        {
            "conceptName": name,
            "correctCount": counts["correct"],
            "totalCount": counts["total"],
            "percentage": round((counts["correct"] / counts["total"]) * 100) if counts["total"] else 0,
        }
        for name, counts in breakdown_map.items()
    ]

    result = TestResult(
        user_id=user_id,
        test_id=test_id,
        concept_id=concept_id,
        answers=graded_answers,
        score=score,
        total_questions=len(questions),
        time_spent_seconds=time_spent_seconds,
        concept_breakdown=concept_breakdown,
    )
    db.add(result)
    await db.commit()
    await db.refresh(result)
    return result


async def list_results(db: AsyncSession, user_id: int, concept_id: Optional[str] = None) -> list[TestResult]:
    query = select(TestResult).where(TestResult.user_id == user_id)
    if concept_id is not None:
        query = query.where(TestResult.concept_id == concept_id)
    query = query.order_by(TestResult.completed_at.desc())
    result = await db.execute(query)
    return list(result.scalars().all())
