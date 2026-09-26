"""Import the static curriculum (subject, chapters, concepts, lessons, quiz questions,
mini-tests) from the frontend's TypeScript data into their DB tables.

Idempotent: every row's primary key is the id already used in the frontend data (e.g.
"derivatives", "chain-rule"), so re-running updates existing rows instead of duplicating
them. Nothing is deleted. Parents are written before children to satisfy foreign keys.

Usage (from backend/):  python scripts/import_frontend_curriculum.py [--dry-run]
Requires Node (uses `npx tsx` to read the frontend's TypeScript data).
"""
import asyncio
import json
import shutil
import subprocess
import sys
from pathlib import Path

for _stream in (sys.stdout, sys.stderr):
    _stream.reconfigure(encoding="utf-8", errors="replace")

BACKEND_DIR = Path(__file__).resolve().parents[1]
FRONTEND_DIR = BACKEND_DIR.parent / "ffrontend"
sys.path.insert(0, str(BACKEND_DIR))

from sqlalchemy import select  # noqa: E402
from sqlalchemy.ext.asyncio import AsyncSession  # noqa: E402

import app.main  # noqa: E402,F401  (registers every model)
from app.db import AsyncSessionLocal, engine  # noqa: E402
from app.modules.curriculum.models import Subject, Chapter, Concept, Lesson  # noqa: E402
from app.modules.quizzes.models import QuizQuestion  # noqa: E402
from app.modules.tests.models import MiniTest, TestQuestion  # noqa: E402


def load_frontend_data() -> dict:
    npx = shutil.which("npx") or shutil.which("npx.cmd")
    if not npx:
        sys.exit("npx not found. Install Node.js to read the frontend data.")
    result = subprocess.run(
        [npx, "tsx", "scripts/export-curriculum.mts"],
        cwd=FRONTEND_DIR,
        capture_output=True,
        encoding="utf-8",
    )
    if result.returncode != 0:
        sys.exit(f"Exporting frontend data failed:\n{result.stderr}")
    return json.loads(result.stdout)


def map_subject(s: dict) -> dict:
    return {
        "id": s["id"],
        "title": s["title"],
        "title_fr": s.get("titleFr"),
        "description": s.get("description"),
        "stream": s.get("stream"),
        "total_chapters": s.get("totalChapters", 0),
        "total_hours": s.get("totalHours", 0),
    }


def map_chapter(c: dict) -> dict:
    return {
        "id": c["id"],
        "subject_id": c["subjectId"],
        "title": c["title"],
        "title_fr": c.get("titleFr"),
        "description": c.get("description"),
        "order": c.get("order", 0),
        "estimated_minutes": c.get("estimatedMinutes"),
        "estimated_hours": c.get("estimatedHours"),
        "stream": c.get("stream"),
        "icon_name": c.get("iconName"),
        "bac_weight": c.get("bacWeight"),
        "semester": c.get("semester"),
        "month": c.get("month"),
        "weeks": c.get("weeks"),
        "official_axis": c.get("officialAxis"),
        "total_weekly_hours": c.get("totalWeeklyHours"),
    }


def map_concept(c: dict) -> dict:
    return {
        "id": c["id"],
        "chapter_id": c["chapterId"],
        "title": c["title"],
        "title_fr": c.get("titleFr"),
        "description": c.get("description"),
        "order": c.get("order", 0),
        "estimated_minutes": c.get("estimatedMinutes"),
        "difficulty": c.get("difficulty"),
        "summary": c.get("summary"),
        "tags": c.get("tags"),
        "week_number": c.get("weekNumber"),
        "week_date": c.get("weekDate"),
        "month": c.get("month"),
        "official_hours": c.get("officialHours"),
        "axis_name": c.get("axisName"),
    }


def map_lesson(l: dict) -> dict:
    return {
        "id": l["id"],
        "concept_id": l["conceptId"],
        "title": l["title"],
        "video_url": l.get("videoUrl"),
        "video_title": l.get("videoTitle"),
        "video_duration": l.get("videoDuration"),
        "video_thumbnail": l.get("videoThumbnail"),
        "estimated_minutes": l.get("estimatedMinutes"),
        "objectives": l.get("objectives"),
        "theory": l.get("theory"),
        "worked_examples": l.get("workedExamples"),
    }


def map_quiz_question(q: dict) -> dict:
    return {
        "id": q["id"],
        "concept_id": q["conceptId"],
        "question_number": q.get("questionNumber", 1),
        "question_text": q["questionText"],
        "question_math": q.get("questionMath"),
        "options": q["options"],
        "correct_option_id": q["correctOptionId"],
        "explanation": q.get("explanation"),
        "explanation_math": q.get("explanationMath"),
    }


def map_mini_test(t: dict) -> dict:
    return {
        "id": t["id"],
        "concept_id": t["conceptId"],
        "title": t["title"],
        "time_limit_minutes": t.get("timeLimitMinutes", 15),
        "total_questions": t.get("totalQuestions", 0),
    }


def map_test_question(q: dict, test_id: str) -> dict:
    return {
        "id": q["id"],
        "test_id": test_id,
        "concept_id": q["conceptId"],
        "chapter_id": q["chapterId"],
        "concept_name": q.get("conceptName"),
        "question_number": q.get("questionNumber", 1),
        "question_text": q["questionText"],
        "question_math": q.get("questionMath"),
        "options": q["options"],
        "correct_option_id": q["correctOptionId"],
        "explanation": q.get("explanation"),
        "explanation_math": q.get("explanationMath"),
    }


async def upsert(db: AsyncSession, model, rows: list[dict]) -> tuple[int, int]:
    created = updated = 0
    for row in rows:
        existing = (await db.execute(select(model).where(model.id == row["id"]))).scalars().first()
        if existing:
            for field, value in row.items():
                setattr(existing, field, value)
            updated += 1
        else:
            db.add(model(**row))
            created += 1
    await db.flush()
    return created, updated


async def main() -> None:
    data = load_frontend_data()
    test_questions = [
        map_test_question(q, t["id"]) for t in data["miniTests"] for q in t["questions"]
    ]
    print(
        f"Read 1 subject, {len(data['chapters'])} chapters, {len(data['concepts'])} concepts, "
        f"{len(data['lessons'])} lessons, {len(data['quizQuestions'])} quiz questions, "
        f"{len(data['miniTests'])} mini-tests ({len(test_questions)} test questions)."
    )
    if "--dry-run" in sys.argv:
        print("Dry run: nothing written.")
        return

    async with AsyncSessionLocal() as db:
        totals = {}
        # Parents before children, so foreign keys always resolve.
        totals["subjects"] = await upsert(db, Subject, [map_subject(data["subject"])])
        totals["chapters"] = await upsert(db, Chapter, [map_chapter(c) for c in data["chapters"]])
        totals["concepts"] = await upsert(db, Concept, [map_concept(c) for c in data["concepts"]])
        totals["lessons"] = await upsert(db, Lesson, [map_lesson(l) for l in data["lessons"]])
        totals["quiz_questions"] = await upsert(
            db, QuizQuestion, [map_quiz_question(q) for q in data["quizQuestions"]]
        )
        totals["mini_tests"] = await upsert(db, MiniTest, [map_mini_test(t) for t in data["miniTests"]])
        totals["test_questions"] = await upsert(db, TestQuestion, test_questions)
        await db.commit()

    for table, (created, updated) in totals.items():
        print(f"{table}: {created} created, {updated} updated")
    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())
