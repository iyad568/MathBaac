from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os

from app.db import engine
from app.modules.community.uploads import UPLOADS_ROOT

# Register every ORM model so Base.metadata / Alembic sees the full schema.
from app.modules.auth.models import User
from app.modules.dashboard.models import StudyStreak, UserActivity
from app.modules.exercises.models import Exercise
from app.modules.curriculum.models import Subject, Chapter, Concept, Lesson
from app.modules.quizzes.models import QuizQuestion, QuizSubmission
from app.modules.tests.models import MiniTest, TestQuestion, TestResult
from app.modules.community.models import CommunityPost, CommunityAnswer, CommunityReply, CommunityVote
from app.modules.progress.models import (
    LessonCompletion,
    ConceptProgress,
    ExerciseAttempt,
    BACExerciseAttempt,
    QuizResult,
    UserPreferences,
)

# Import active routers only
from app.modules.auth.routes import router as auth_router
from app.modules.dashboard.routes import router as dashboard_router
from app.modules.exercises.routes import router as exercises_router
from app.modules.curriculum.routes import router as curriculum_router
from app.modules.quizzes.routes import router as quizzes_router
from app.modules.tests.routes import router as tests_router
from app.modules.community.routes import router as community_router
from app.modules.progress.routes import router as progress_router
from app.modules.admin.routes import router as admin_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    
    try:
        await engine.dispose()
        print("Database connection closed")
    except Exception as e:
        print(f"Error closing database: {e}")


app = FastAPI(
    title="MathBac",
    description="A bac education platform",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS",
            "http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173",
        ).split(",")
        if origin.strip()
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOADS_ROOT.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOADS_ROOT), name="uploads")

app.include_router(auth_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")
app.include_router(exercises_router, prefix="/api")
app.include_router(curriculum_router, prefix="/api")
app.include_router(quizzes_router, prefix="/api")
app.include_router(tests_router, prefix="/api")
app.include_router(community_router, prefix="/api")
app.include_router(progress_router, prefix="/api")
app.include_router(admin_router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "MathBac backend is running"}
