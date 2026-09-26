"""
Initialize the SQLite database with all tables
Run this script to set up the database for testing
"""
import asyncio
from app.db import engine, Base
from app.modules.auth.models import User
from app.modules.dashboard.models import StudyStreak, UserActivity
from app.modules.exercises.models import Exercise
from app.modules.curriculum.models import Subject, Chapter, Concept, Lesson
from app.modules.quizzes.models import QuizQuestion, QuizSubmission
from app.modules.tests.models import MiniTest, TestQuestion, TestResult
from app.modules.community.models import CommunityPost, CommunityAnswer, CommunityReply, CommunityVote
from app.modules.progress.models import LessonCompletion


async def init_db():
    print("Creating database tables...")
    async with engine.begin() as conn:
        # Drop all tables (use with caution!)
        # await conn.run_sync(Base.metadata.drop_all)
        
        # Create all tables
        await conn.run_sync(Base.metadata.create_all)
    
    print("✅ Database tables created successfully!")
    print("📁 Database file: mathbac.db")


if __name__ == "__main__":
    asyncio.run(init_db())
