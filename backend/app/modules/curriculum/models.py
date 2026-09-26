from sqlalchemy import Column, String, Integer, Float, Text, JSON, ForeignKey
from app.db import Base


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(String(100), primary_key=True)
    title = Column(String(255), nullable=False)
    title_fr = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    stream = Column(String(255), nullable=True)
    total_chapters = Column(Integer, default=0, nullable=False)
    total_hours = Column(Integer, default=0, nullable=False)


class Chapter(Base):
    __tablename__ = "chapters"

    id = Column(String(100), primary_key=True)
    subject_id = Column(String(100), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    title_fr = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    order = Column(Integer, default=0, nullable=False)
    estimated_minutes = Column(Integer, nullable=True)
    estimated_hours = Column(Float, nullable=True)
    stream = Column(String(255), nullable=True)
    icon_name = Column(String(100), nullable=True)
    bac_weight = Column(String(100), nullable=True)
    semester = Column(Integer, nullable=True)
    month = Column(String(50), nullable=True)
    weeks = Column(String(50), nullable=True)
    official_axis = Column(String(255), nullable=True)
    total_weekly_hours = Column(Float, nullable=True)


class Concept(Base):
    __tablename__ = "concepts"

    id = Column(String(100), primary_key=True)
    chapter_id = Column(String(100), ForeignKey("chapters.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    title_fr = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    order = Column(Integer, default=0, nullable=False)
    estimated_minutes = Column(Integer, nullable=True)
    difficulty = Column(String(20), nullable=True)
    summary = Column(Text, nullable=True)
    tags = Column(JSON, nullable=True)
    week_number = Column(Integer, nullable=True)
    week_date = Column(String(50), nullable=True)
    month = Column(String(50), nullable=True)
    official_hours = Column(Float, nullable=True)
    axis_name = Column(String(255), nullable=True)


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(String(100), primary_key=True)
    concept_id = Column(String(100), ForeignKey("concepts.id", ondelete="CASCADE"), nullable=False, unique=True, index=True)
    title = Column(String(255), nullable=False)
    video_url = Column(String(500), nullable=True)
    video_title = Column(String(255), nullable=True)
    video_duration = Column(String(20), nullable=True)
    video_thumbnail = Column(String(500), nullable=True)
    estimated_minutes = Column(Integer, nullable=True)
    objectives = Column(JSON, nullable=True)
    theory = Column(JSON, nullable=True)
    worked_examples = Column(JSON, nullable=True)
