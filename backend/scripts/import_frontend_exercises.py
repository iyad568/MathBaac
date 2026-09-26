"""Import the frontend's static exercises and BAC problems into the `exercises` table.

Idempotent: rows are matched on `external_id` (the frontend id, e.g. "ex-1"), so re-running
updates existing rows instead of duplicating them. Nothing is deleted.

Usage (from backend/):  python scripts/import_frontend_exercises.py [--dry-run]
Requires Node (uses `npx tsx` to read the frontend's TypeScript data).
"""
import asyncio
import json
import shutil
import subprocess
import sys
from pathlib import Path

# The Windows console defaults to cp1252, which cannot print the Arabic text in SQL logs.
for _stream in (sys.stdout, sys.stderr):
    _stream.reconfigure(encoding="utf-8", errors="replace")

BACKEND_DIR = Path(__file__).resolve().parents[1]
FRONTEND_DIR = BACKEND_DIR.parent / "ffrontend"
sys.path.insert(0, str(BACKEND_DIR))

from sqlalchemy import select  # noqa: E402

import app.main  # noqa: E402,F401  (registers every model)
from app.db import AsyncSessionLocal, engine  # noqa: E402
from app.modules.exercises.models import Exercise  # noqa: E402


def load_frontend_data() -> dict:
    npx = shutil.which("npx") or shutil.which("npx.cmd")
    if not npx:
        sys.exit("npx not found. Install Node.js to read the frontend data.")
    result = subprocess.run(
        [npx, "tsx", "scripts/export-exercises.mts"],
        cwd=FRONTEND_DIR,
        capture_output=True,
        encoding="utf-8",
    )
    if result.returncode != 0:
        sys.exit(f"Exporting frontend data failed:\n{result.stderr}")
    return json.loads(result.stdout)


def map_exercise(e: dict) -> dict:
    return {
        "external_id": e["id"],
        "exercise_type": "exercise",
        "chapter_id": e["chapterId"],
        "concept_id": e.get("conceptId"),
        "number": e.get("number"),
        "title": e.get("title"),
        "content": e["question"],
        "question_math": e.get("questionMath"),
        "solution": e.get("explanation"),
        "difficulty": e.get("difficulty"),
        "estimated_minutes": e.get("estimatedMinutes"),
        "answer_type": e.get("answerType"),
        "options": e.get("options"),
        "correct_answer": e.get("correctAnswer"),
        "accepted_answers": e.get("acceptedAnswers"),
        "solution_steps": e.get("solutionSteps"),
        "explanation": e.get("explanation"),
        "hint": e.get("hint"),
    }


def map_bac(b: dict) -> dict:
    return {
        "external_id": b["id"],
        "exercise_type": "bac",
        "chapter_id": b["chapterId"],
        "concept_id": b.get("conceptId"),
        "title": b.get("title"),
        "content": b["question"],
        "question_math": b.get("questionMath"),
        "difficulty": b.get("difficulty"),
        "estimated_minutes": b.get("estimatedMinutes"),
        "points": b.get("points"),
        "bac_year": b.get("year"),
        "bac_session": b.get("session"),
        "bac_stream": b.get("stream"),
        "sub_questions": b.get("subQuestions"),
        "official_solution": b.get("officialSolution"),
    }


async def upsert(rows: list[dict]) -> tuple[int, int]:
    created = updated = 0
    async with AsyncSessionLocal() as db:
        for row in rows:
            existing = (
                await db.execute(select(Exercise).where(Exercise.external_id == row["external_id"]))
            ).scalars().first()
            if existing:
                for field, value in row.items():
                    setattr(existing, field, value)
                updated += 1
            else:
                db.add(Exercise(**row))
                created += 1
        await db.commit()
    return created, updated


async def main() -> None:
    data = load_frontend_data()
    rows = [map_exercise(e) for e in data["exercises"]] + [map_bac(b) for b in data["bacExercises"]]
    print(f"Read {len(data['exercises'])} exercises and {len(data['bacExercises'])} BAC problems from the frontend.")
    if "--dry-run" in sys.argv:
        print("Dry run: nothing written.")
    else:
        created, updated = await upsert(rows)
        print(f"Done: {created} created, {updated} updated.")
    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())
