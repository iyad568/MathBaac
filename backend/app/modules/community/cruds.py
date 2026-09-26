from typing import Optional

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.auth.models import User
from app.modules.community.models import CommunityPost, CommunityAnswer, CommunityReply, CommunityVote


# ── Posts ──────────────────────────────────────────────────────────────────

async def create_post(db: AsyncSession, author_id: int, data: dict) -> CommunityPost:
    post = CommunityPost(author_id=author_id, **data)
    db.add(post)
    await db.commit()
    await db.refresh(post)
    return post


async def get_post(db: AsyncSession, post_id: int) -> Optional[CommunityPost]:
    result = await db.execute(select(CommunityPost).where(CommunityPost.id == post_id))
    return result.scalars().first()


async def list_posts(db: AsyncSession, category: Optional[str] = None) -> list[CommunityPost]:
    query = select(CommunityPost)
    if category is not None:
        query = query.where(CommunityPost.category == category)
    query = query.order_by(CommunityPost.created_at.desc())
    result = await db.execute(query)
    return list(result.scalars().all())


async def get_posts_by_ids(db: AsyncSession, post_ids: list[int]) -> dict[int, CommunityPost]:
    if not post_ids:
        return {}
    result = await db.execute(select(CommunityPost).where(CommunityPost.id.in_(post_ids)))
    return {post.id: post for post in result.scalars().all()}


async def count_answers_for_posts(db: AsyncSession, post_ids: list[int]) -> dict[int, int]:
    """One query for all posts, instead of a separate COUNT per post."""
    if not post_ids:
        return {}
    result = await db.execute(
        select(CommunityAnswer.post_id, func.count())
        .where(CommunityAnswer.post_id.in_(post_ids))
        .group_by(CommunityAnswer.post_id)
    )
    return dict(result.all())


async def list_posts_by_author(db: AsyncSession, author_id: int) -> list[CommunityPost]:
    result = await db.execute(
        select(CommunityPost).where(CommunityPost.author_id == author_id).order_by(CommunityPost.created_at.desc())
    )
    return list(result.scalars().all())


async def increment_views(db: AsyncSession, post: CommunityPost) -> CommunityPost:
    post.views_count += 1
    await db.commit()
    await db.refresh(post)
    return post


# ── Answers ────────────────────────────────────────────────────────────────

async def create_answer(db: AsyncSession, post_id: int, author_id: int, content: str) -> CommunityAnswer:
    answer = CommunityAnswer(post_id=post_id, author_id=author_id, content=content)
    db.add(answer)
    await db.commit()
    await db.refresh(answer)
    return answer


async def get_answer(db: AsyncSession, answer_id: int) -> Optional[CommunityAnswer]:
    result = await db.execute(select(CommunityAnswer).where(CommunityAnswer.id == answer_id))
    return result.scalars().first()


async def list_answers_for_post(db: AsyncSession, post_id: int) -> list[CommunityAnswer]:
    result = await db.execute(
        select(CommunityAnswer).where(CommunityAnswer.post_id == post_id).order_by(CommunityAnswer.created_at)
    )
    return list(result.scalars().all())


async def list_answers_by_author(db: AsyncSession, author_id: int) -> list[CommunityAnswer]:
    result = await db.execute(
        select(CommunityAnswer).where(CommunityAnswer.author_id == author_id).order_by(CommunityAnswer.created_at.desc())
    )
    return list(result.scalars().all())


async def mark_best_answer(db: AsyncSession, post: CommunityPost, answer: CommunityAnswer) -> CommunityAnswer:
    others = await list_answers_for_post(db, post.id)
    for other in others:
        if other.is_best_answer and other.id != answer.id:
            other.is_best_answer = False
    answer.is_best_answer = True
    post.has_best_answer = True
    await db.commit()
    await db.refresh(answer)
    return answer


# ── Replies ────────────────────────────────────────────────────────────────

async def create_reply(db: AsyncSession, answer_id: int, author_id: int, content: str) -> CommunityReply:
    reply = CommunityReply(answer_id=answer_id, author_id=author_id, content=content)
    db.add(reply)
    await db.commit()
    await db.refresh(reply)
    return reply


async def get_reply(db: AsyncSession, reply_id: int) -> Optional[CommunityReply]:
    result = await db.execute(select(CommunityReply).where(CommunityReply.id == reply_id))
    return result.scalars().first()


async def list_replies_for_answer(db: AsyncSession, answer_id: int) -> list[CommunityReply]:
    result = await db.execute(
        select(CommunityReply).where(CommunityReply.answer_id == answer_id).order_by(CommunityReply.created_at)
    )
    return list(result.scalars().all())


async def list_replies_for_answers(db: AsyncSession, answer_ids: list[int]) -> list[CommunityReply]:
    """One query for every answer's replies, instead of a separate query per answer."""
    if not answer_ids:
        return []
    result = await db.execute(
        select(CommunityReply).where(CommunityReply.answer_id.in_(answer_ids)).order_by(CommunityReply.created_at)
    )
    return list(result.scalars().all())


# ── Votes ──────────────────────────────────────────────────────────────────

async def get_vote(db: AsyncSession, user_id: int, target_type: str, target_id: int) -> Optional[CommunityVote]:
    result = await db.execute(
        select(CommunityVote).where(
            CommunityVote.user_id == user_id,
            CommunityVote.target_type == target_type,
            CommunityVote.target_id == target_id,
        )
    )
    return result.scalars().first()


async def get_votes_for_user(db: AsyncSession, user_id: int, target_type: str, target_ids: list[int]) -> dict[int, int]:
    if not target_ids:
        return {}
    result = await db.execute(
        select(CommunityVote).where(
            CommunityVote.user_id == user_id,
            CommunityVote.target_type == target_type,
            CommunityVote.target_id.in_(target_ids),
        )
    )
    return {vote.target_id: vote.value for vote in result.scalars().all()}


async def apply_vote(
    db: AsyncSession, target, user_id: int, target_type: str, target_id: int, value: int
) -> tuple[Optional[int], Optional[int]]:
    """Applies/updates/removes a vote and adjusts the target's denormalized `votes` counter.

    Returns (old_value, new_value) — either may be None (no vote before/after) — so the
    caller can award/dock the author's reputation for the net change.
    """
    existing = await get_vote(db, user_id, target_type, target_id)
    old_value = existing.value if existing else None
    if existing and existing.value == value:
        target.votes -= value
        await db.delete(existing)
        new_value = None
    elif existing:
        target.votes += value - existing.value
        existing.value = value
        new_value = value
    else:
        target.votes += value
        db.add(CommunityVote(user_id=user_id, target_type=target_type, target_id=target_id, value=value))
        new_value = value
    await db.commit()
    await db.refresh(target)
    return old_value, new_value


# ── Profile aggregate ──────────────────────────────────────────────────────

async def get_profile_counts(db: AsyncSession, user_id: int) -> dict:
    posts_count = (
        await db.execute(select(func.count()).where(CommunityPost.author_id == user_id))
    ).scalar() or 0
    answers_count = (
        await db.execute(select(func.count()).where(CommunityAnswer.author_id == user_id))
    ).scalar() or 0
    helpful_answers_count = (
        await db.execute(
            select(func.count()).where(
                CommunityAnswer.author_id == user_id, CommunityAnswer.is_best_answer == True
            )
        )
    ).scalar() or 0
    return {
        "posts_count": posts_count,
        "answers_count": answers_count,
        "helpful_answers_count": helpful_answers_count,
    }
