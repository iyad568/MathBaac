from typing import Optional, Any
from app.schemas_common import CamelModel


# ── Subject ──────────────────────────────────────────────────────────────────

class SubjectCreate(CamelModel):
    id: str
    title: str
    title_fr: Optional[str] = None
    description: Optional[str] = None
    stream: Optional[str] = None
    total_chapters: int = 0
    total_hours: int = 0


class SubjectUpdate(CamelModel):
    title: Optional[str] = None
    title_fr: Optional[str] = None
    description: Optional[str] = None
    stream: Optional[str] = None
    total_chapters: Optional[int] = None
    total_hours: Optional[int] = None


class SubjectResponse(SubjectCreate):
    pass


# ── Chapter ──────────────────────────────────────────────────────────────────

class ChapterCreate(CamelModel):
    id: str
    subject_id: str
    title: str
    title_fr: Optional[str] = None
    description: Optional[str] = None
    order: int = 0
    estimated_minutes: Optional[int] = None
    estimated_hours: Optional[float] = None
    stream: Optional[str] = None
    icon_name: Optional[str] = None
    bac_weight: Optional[str] = None
    semester: Optional[int] = None
    month: Optional[str] = None
    weeks: Optional[str] = None
    official_axis: Optional[str] = None
    total_weekly_hours: Optional[float] = None


class ChapterUpdate(CamelModel):
    subject_id: Optional[str] = None
    title: Optional[str] = None
    title_fr: Optional[str] = None
    description: Optional[str] = None
    order: Optional[int] = None
    estimated_minutes: Optional[int] = None
    estimated_hours: Optional[float] = None
    stream: Optional[str] = None
    icon_name: Optional[str] = None
    bac_weight: Optional[str] = None
    semester: Optional[int] = None
    month: Optional[str] = None
    weeks: Optional[str] = None
    official_axis: Optional[str] = None
    total_weekly_hours: Optional[float] = None


class ChapterResponse(ChapterCreate):
    pass


# ── Concept ──────────────────────────────────────────────────────────────────

class ConceptCreate(CamelModel):
    id: str
    chapter_id: str
    title: str
    title_fr: Optional[str] = None
    description: Optional[str] = None
    order: int = 0
    estimated_minutes: Optional[int] = None
    difficulty: Optional[str] = None
    summary: Optional[str] = None
    tags: Optional[list[str]] = None
    week_number: Optional[int] = None
    week_date: Optional[str] = None
    month: Optional[str] = None
    official_hours: Optional[float] = None
    axis_name: Optional[str] = None


class ConceptUpdate(CamelModel):
    chapter_id: Optional[str] = None
    title: Optional[str] = None
    title_fr: Optional[str] = None
    description: Optional[str] = None
    order: Optional[int] = None
    estimated_minutes: Optional[int] = None
    difficulty: Optional[str] = None
    summary: Optional[str] = None
    tags: Optional[list[str]] = None
    week_number: Optional[int] = None
    week_date: Optional[str] = None
    month: Optional[str] = None
    official_hours: Optional[float] = None
    axis_name: Optional[str] = None


class ConceptResponse(ConceptCreate):
    pass


# ── Lesson ───────────────────────────────────────────────────────────────────
# `theory` and `workedExamples` are free-form JSON matching the frontend's
# TheorySection / WorkedExample[] shapes (kept flexible since it's authored content).

class LessonCreate(CamelModel):
    id: str
    concept_id: str
    title: str
    video_url: Optional[str] = None
    video_title: Optional[str] = None
    video_duration: Optional[str] = None
    video_thumbnail: Optional[str] = None
    estimated_minutes: Optional[int] = None
    objectives: Optional[list[str]] = None
    theory: Optional[dict[str, Any]] = None
    worked_examples: Optional[list[dict[str, Any]]] = None


class LessonUpdate(CamelModel):
    title: Optional[str] = None
    video_url: Optional[str] = None
    video_title: Optional[str] = None
    video_duration: Optional[str] = None
    video_thumbnail: Optional[str] = None
    estimated_minutes: Optional[int] = None
    objectives: Optional[list[str]] = None
    theory: Optional[dict[str, Any]] = None
    worked_examples: Optional[list[dict[str, Any]]] = None


class LessonResponse(LessonCreate):
    pass
