from logging.config import fileConfig
import os

from alembic import context
from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config
from dotenv import load_dotenv

load_dotenv()

from app.db import Base
from app.modules.auth.models import User
from app.modules.dashboard.models import StudyStreak, UserActivity
from app.modules.exercises.models import Exercise
from app.modules.curriculum.models import Subject, Chapter, Concept, Lesson
from app.modules.quizzes.models import QuizQuestion, QuizSubmission
from app.modules.tests.models import MiniTest, TestQuestion, TestResult
from app.modules.community.models import CommunityPost, CommunityAnswer, CommunityReply, CommunityVote
from app.modules.progress.models import LessonCompletion

config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

url = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./mathbac.db")
if url:
    config.set_main_option("sqlalchemy.url", url.replace("%", "%%"))

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    context.configure(url=config.get_main_option("sqlalchemy.url"), target_metadata=target_metadata, literal_binds=True, dialect_opts={"paramstyle": "named"})
    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    connectable = async_engine_from_config(config.get_section(config.config_ini_section, {}), prefix="sqlalchemy.", poolclass=pool.NullPool)
    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)
    await connectable.dispose()


def do_run_migrations(connection: Connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata, compare_type=True)
    with context.begin_transaction():
        context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    import asyncio
    asyncio.run(run_async_migrations())
