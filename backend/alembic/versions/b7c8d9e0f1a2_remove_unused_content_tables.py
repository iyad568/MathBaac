"""remove unused backend content tables

Revision ID: b7c8d9e0f1a2
Revises: 9d3f4a1b2c6d
Create Date: 2026-09-03
"""
from typing import Sequence, Union

from alembic import op


revision: str = "b7c8d9e0f1a2"
down_revision: Union[str, Sequence[str], None] = "9d3f4a1b2c6d"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # These tables stored curriculum content that is now owned by the frontend.
    for table_name in (
        "exam_attempt_answers",
        "exam_attempts",
        "exam_questions",
        "exams",
        "exercise_attempts",
        "exercises",
        "user_chapter_progress",
        "topics",
        "chapters",
        "study_sessions",
    ):
        op.execute(f'DROP TABLE IF EXISTS "{table_name}" CASCADE')

    for enum_name in (
        "difficulty_enum",
        "exercise_speciality_enum",
        "exam_session_enum",
        "exam_speciality_enum",
        "chapter_speciality_enum",
    ):
        op.execute(f'DROP TYPE IF EXISTS "{enum_name}" CASCADE')


def downgrade() -> None:
    # Removed content cannot be reconstructed because it is static frontend data.
    pass
