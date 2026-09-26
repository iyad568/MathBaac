from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.auth.models import User
from app.modules.community import cruds
from app.modules.community.models import CommunityPost, CommunityAnswer, CommunityReply
from app.modules.community.schemas import (
    CommunityAuthor,
    CommunityAnswerResponse,
    CommunityReplyResponse,
    CommunityPostListItem,
    CommunityPostDetail,
)

# Reputation earned for creating content (mirrors what a real forum rewards contribution with).
POST_CREATED_REPUTATION = 5
ANSWER_CREATED_REPUTATION = 10
REPLY_CREATED_REPUTATION = 2
BEST_ANSWER_REPUTATION = 15

# Reputation per vote, by target type: (points for an upvote, points deducted for a downvote).
# Replies aren't weighted — matches the original vote-scoring rules this was ported from.
VOTE_WEIGHTS = {"post": (5, 2), "answer": (10, 3), "reply": (0, 0)}


def _vote_reputation_delta(old_value: Optional[int], new_value: Optional[int], up: int, down: int) -> int:
    def points(v: Optional[int]) -> int:
        if v == 1:
            return up
        if v == -1:
            return -down
        return 0

    return points(new_value) - points(old_value)


async def award_vote_reputation(
    db: AsyncSession, author_id: int, voter_id: int, target_type: str, old_value: Optional[int], new_value: Optional[int]
) -> None:
    if author_id == voter_id:
        return  # voting on your own content earns nothing, to prevent trivial gaming
    up, down = VOTE_WEIGHTS[target_type]
    delta = _vote_reputation_delta(old_value, new_value, up, down)
    if delta:
        await apply_reputation(db, author_id, delta)


async def apply_reputation(db: AsyncSession, user_id: int, delta: int, ensure_badge: Optional[str] = None) -> None:
    """Adjusts a user's reputation and recomputes their badge set from the current thresholds."""
    user = await db.get(User, user_id)
    if not user:
        return
    user.reputation = max(0, (user.reputation or 0) + delta)

    counts = await cruds.get_profile_counts(db, user_id)
    badges = set(user.badges or [])
    if ensure_badge:
        badges.add(ensure_badge)
    if counts["helpful_answers_count"] >= 3:
        badges.add("helpful-student")
    if user.reputation >= 100:
        badges.add("math-expert")
    if counts["posts_count"] >= 5 or counts["answers_count"] >= 10:
        badges.add("top-contributor")
    user.badges = sorted(badges)

    await db.commit()


def to_author(user: User) -> CommunityAuthor:
    return CommunityAuthor(
        id=user.id,
        name=user.fullName,
        username=user.username,
        avatar_url=user.avatar_url,
        stream=user.stream,
        badges=user.badges or [],
    )


def build_post_list_item(post: CommunityPost, author: User, answers_count: int, user_vote_value: int | None) -> CommunityPostListItem:
    return CommunityPostListItem(
        id=post.id,
        title=post.title,
        content=post.content,
        category=post.category,
        author=to_author(author),
        created_at=post.created_at,
        votes=post.votes,
        user_vote={1: "up", -1: "down"}.get(user_vote_value),
        views_count=post.views_count,
        answers_count=answers_count,
        has_best_answer=post.has_best_answer,
        image_url=post.image_url,
        image_caption=post.image_caption,
        tags=post.tags or [],
    )


def build_reply_response(reply: CommunityReply, author: User, user_vote_value: int | None) -> CommunityReplyResponse:
    return CommunityReplyResponse(
        id=reply.id,
        answer_id=reply.answer_id,
        author=to_author(author),
        content=reply.content,
        created_at=reply.created_at,
        votes=reply.votes,
        user_vote={1: "up", -1: "down"}.get(user_vote_value),
    )


def build_answer_response(
    answer: CommunityAnswer,
    author: User,
    user_vote_value: int | None,
    replies: list[CommunityReplyResponse],
) -> CommunityAnswerResponse:
    return CommunityAnswerResponse(
        id=answer.id,
        post_id=answer.post_id,
        author=to_author(author),
        content=answer.content,
        created_at=answer.created_at,
        votes=answer.votes,
        user_vote={1: "up", -1: "down"}.get(user_vote_value),
        is_best_answer=answer.is_best_answer,
        replies=replies,
    )
