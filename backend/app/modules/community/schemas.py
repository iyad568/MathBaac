from typing import Optional, Literal
from datetime import datetime
from app.schemas_common import CamelModel


# ── Author (lightweight identity, embedded in posts/answers/replies) ─────────

class CommunityAuthor(CamelModel):
    id: int
    name: str
    username: Optional[str] = None
    avatar_url: Optional[str] = None
    stream: Optional[str] = None
    badges: Optional[list[str]] = None


# ── Full profile (for the community profile page) ────────────────────────────

class CommunityUserProfile(CamelModel):
    id: int
    name: str
    username: Optional[str] = None
    avatar_url: Optional[str] = None
    stream: Optional[str] = None
    reputation: int = 0
    badges: Optional[list[str]] = None
    posts_count: int = 0
    answers_count: int = 0
    helpful_answers_count: int = 0
    joined_date: Optional[datetime] = None
    bio: Optional[str] = None


# ── Reply ──────────────────────────────────────────────────────────────────

class CommunityReplyCreate(CamelModel):
    content: str


class CommunityReplyResponse(CamelModel):
    id: int
    answer_id: int
    author: CommunityAuthor
    content: str
    created_at: datetime
    votes: int
    user_vote: Optional[Literal["up", "down"]] = None


# ── Answer ─────────────────────────────────────────────────────────────────

class CommunityAnswerCreate(CamelModel):
    content: str


class CommunityAnswerResponse(CamelModel):
    id: int
    post_id: int
    author: CommunityAuthor
    content: str
    created_at: datetime
    votes: int
    user_vote: Optional[Literal["up", "down"]] = None
    is_best_answer: bool
    replies: list[CommunityReplyResponse] = []


# ── Uploads ────────────────────────────────────────────────────────────────

class ImageUploadResponse(CamelModel):
    url: str


# ── Post ───────────────────────────────────────────────────────────────────

class CommunityPostCreate(CamelModel):
    title: str
    content: str
    category: str
    image_url: Optional[str] = None
    image_caption: Optional[str] = None
    tags: Optional[list[str]] = None


class CommunityPostListItem(CamelModel):
    id: int
    title: str
    content: str
    category: str
    author: CommunityAuthor
    created_at: datetime
    votes: int
    user_vote: Optional[Literal["up", "down"]] = None
    views_count: int
    answers_count: int
    has_best_answer: bool
    image_url: Optional[str] = None
    image_caption: Optional[str] = None
    tags: Optional[list[str]] = None


class CommunityPostDetail(CommunityPostListItem):
    answers: list[CommunityAnswerResponse] = []


class VoteRequest(CamelModel):
    value: Literal[1, -1]


class CommunityAnswerWithPost(CamelModel):
    post_id: int
    post_title: str
    answer: CommunityAnswerResponse
