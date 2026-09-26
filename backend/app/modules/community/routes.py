from typing import Optional

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.dependencies import get_current_user
from app.modules.auth.cruds import get_user_by_id, get_users_by_ids
from app.modules.community import cruds, services
from app.modules.community.schemas import (
    CommunityPostCreate,
    CommunityPostListItem,
    CommunityPostDetail,
    CommunityAnswerCreate,
    CommunityAnswerResponse,
    CommunityAnswerWithPost,
    CommunityReplyCreate,
    CommunityReplyResponse,
    CommunityUserProfile,
    ImageUploadResponse,
    VoteRequest,
)
from app.modules.community.uploads import InvalidImageUpload, save_community_image

router = APIRouter(prefix="/community", tags=["Community"])


@router.post("/uploads/image", response_model=ImageUploadResponse, status_code=status.HTTP_201_CREATED)
async def upload_community_image(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
):
    """Stores an image attachment (for a post) and returns its URL path."""
    try:
        url = await save_community_image(file)
    except InvalidImageUpload as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error.message)
    return ImageUploadResponse(url=url)


# ── Posts ──────────────────────────────────────────────────────────────────

@router.get("/posts", response_model=list[CommunityPostListItem])
async def list_posts(
    category: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    posts = await cruds.list_posts(db, category)
    post_ids = [p.id for p in posts]
    # Batched: one query per lookup below, instead of one per post (avoids N+1).
    authors = await get_users_by_ids(db, [p.author_id for p in posts])
    answer_counts = await cruds.count_answers_for_posts(db, post_ids)
    user_votes = await cruds.get_votes_for_user(db, current_user.id, "post", post_ids)

    return [
        services.build_post_list_item(post, authors[post.author_id], answer_counts.get(post.id, 0), user_votes.get(post.id))
        for post in posts
    ]


@router.post("/posts", response_model=CommunityPostListItem, status_code=status.HTTP_201_CREATED)
async def create_post(
    data: CommunityPostCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    post = await cruds.create_post(db, current_user.id, data.model_dump())
    await services.apply_reputation(db, current_user.id, services.POST_CREATED_REPUTATION)
    return services.build_post_list_item(post, current_user, 0, None)


@router.get("/posts/{post_id}", response_model=CommunityPostDetail)
async def get_post(
    post_id: int,
    count_view: bool = True,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """`count_view=false` lets the frontend re-fetch after voting/answering without inflating views."""
    post = await cruds.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    if count_view:
        post = await cruds.increment_views(db, post)

    # Everything below is batched into a fixed number of queries regardless of how many
    # answers/replies the post has, instead of one round-trip per answer and per reply.
    answers = await cruds.list_answers_for_post(db, post.id)
    answer_ids = [a.id for a in answers]
    all_replies = await cruds.list_replies_for_answers(db, answer_ids)
    reply_ids = [r.id for r in all_replies]

    author_ids = {post.author_id, *(a.author_id for a in answers), *(r.author_id for r in all_replies)}
    authors = await get_users_by_ids(db, list(author_ids))

    answer_votes = await cruds.get_votes_for_user(db, current_user.id, "answer", answer_ids)
    reply_votes = await cruds.get_votes_for_user(db, current_user.id, "reply", reply_ids)
    post_votes = await cruds.get_votes_for_user(db, current_user.id, "post", [post.id])

    replies_by_answer: dict[int, list] = {}
    for reply in all_replies:
        replies_by_answer.setdefault(reply.answer_id, []).append(reply)

    answer_responses = [
        services.build_answer_response(
            answer,
            authors[answer.author_id],
            answer_votes.get(answer.id),
            [
                services.build_reply_response(reply, authors[reply.author_id], reply_votes.get(reply.id))
                for reply in replies_by_answer.get(answer.id, [])
            ],
        )
        for answer in answers
    ]

    list_item = services.build_post_list_item(post, authors[post.author_id], len(answers), post_votes.get(post.id))
    return CommunityPostDetail(**list_item.model_dump(), answers=answer_responses)


@router.post("/posts/{post_id}/vote", response_model=CommunityPostListItem)
async def vote_post(
    post_id: int,
    data: VoteRequest,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    post = await cruds.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    old_value, new_value = await cruds.apply_vote(db, post, current_user.id, "post", post_id, data.value)
    await services.award_vote_reputation(db, post.author_id, current_user.id, "post", old_value, new_value)
    author = await get_user_by_id(db, post.author_id)
    answers = await cruds.list_answers_for_post(db, post.id)
    user_votes = await cruds.get_votes_for_user(db, current_user.id, "post", [post.id])
    return services.build_post_list_item(post, author, len(answers), user_votes.get(post.id))


# ── Answers ────────────────────────────────────────────────────────────────

@router.post("/posts/{post_id}/answers", response_model=CommunityAnswerResponse, status_code=status.HTTP_201_CREATED)
async def create_answer(
    post_id: int,
    data: CommunityAnswerCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    post = await cruds.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    answer = await cruds.create_answer(db, post_id, current_user.id, data.content)
    await services.apply_reputation(db, current_user.id, services.ANSWER_CREATED_REPUTATION)
    return services.build_answer_response(answer, current_user, None, [])


@router.post("/answers/{answer_id}/vote", response_model=CommunityAnswerResponse)
async def vote_answer(
    answer_id: int,
    data: VoteRequest,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    answer = await cruds.get_answer(db, answer_id)
    if not answer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Answer not found")
    old_value, new_value = await cruds.apply_vote(db, answer, current_user.id, "answer", answer_id, data.value)
    await services.award_vote_reputation(db, answer.author_id, current_user.id, "answer", old_value, new_value)

    replies = await cruds.list_replies_for_answer(db, answer.id)
    author_ids = {answer.author_id, *(r.author_id for r in replies)}
    authors = await get_users_by_ids(db, list(author_ids))
    reply_votes = await cruds.get_votes_for_user(db, current_user.id, "reply", [r.id for r in replies])
    reply_responses = [
        services.build_reply_response(reply, authors[reply.author_id], reply_votes.get(reply.id)) for reply in replies
    ]
    answer_votes = await cruds.get_votes_for_user(db, current_user.id, "answer", [answer.id])
    return services.build_answer_response(answer, authors[answer.author_id], answer_votes.get(answer.id), reply_responses)


@router.post("/answers/{answer_id}/best", response_model=CommunityAnswerResponse)
async def mark_best_answer(
    answer_id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    answer = await cruds.get_answer(db, answer_id)
    if not answer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Answer not found")
    post = await cruds.get_post(db, answer.post_id)
    if post.author_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only the post author can mark a best answer")
    was_already_best = answer.is_best_answer
    answer = await cruds.mark_best_answer(db, post, answer)
    if answer.is_best_answer and not was_already_best:
        await services.apply_reputation(db, answer.author_id, services.BEST_ANSWER_REPUTATION, ensure_badge="bac-helper")
    author = await get_user_by_id(db, answer.author_id)
    return services.build_answer_response(answer, author, None, [])


# ── Replies ────────────────────────────────────────────────────────────────

@router.post("/answers/{answer_id}/replies", response_model=CommunityReplyResponse, status_code=status.HTTP_201_CREATED)
async def create_reply(
    answer_id: int,
    data: CommunityReplyCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    answer = await cruds.get_answer(db, answer_id)
    if not answer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Answer not found")
    reply = await cruds.create_reply(db, answer_id, current_user.id, data.content)
    await services.apply_reputation(db, current_user.id, services.REPLY_CREATED_REPUTATION)
    return services.build_reply_response(reply, current_user, None)


@router.post("/replies/{reply_id}/vote", response_model=CommunityReplyResponse)
async def vote_reply(
    reply_id: int,
    data: VoteRequest,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    reply = await cruds.get_reply(db, reply_id)
    if not reply:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Reply not found")
    await cruds.apply_vote(db, reply, current_user.id, "reply", reply_id, data.value)
    author = await get_user_by_id(db, reply.author_id)
    user_votes = await cruds.get_votes_for_user(db, current_user.id, "reply", [reply.id])
    return services.build_reply_response(reply, author, user_votes.get(reply.id))


# ── Profile ────────────────────────────────────────────────────────────────

@router.get("/users/{user_id}", response_model=CommunityUserProfile)
async def get_user_profile(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    counts = await cruds.get_profile_counts(db, user_id)
    return CommunityUserProfile(
        id=user.id,
        name=user.fullName,
        username=user.username,
        avatar_url=user.avatar_url,
        stream=user.stream,
        reputation=user.reputation,
        badges=user.badges or [],
        posts_count=counts["posts_count"],
        answers_count=counts["answers_count"],
        helpful_answers_count=counts["helpful_answers_count"],
        joined_date=user.created_at,
        bio=user.bio,
    )


@router.get("/users/{user_id}/posts", response_model=list[CommunityPostListItem])
async def list_user_posts(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    author = await get_user_by_id(db, user_id)
    if not author:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    posts = await cruds.list_posts_by_author(db, user_id)
    post_ids = [p.id for p in posts]
    answer_counts = await cruds.count_answers_for_posts(db, post_ids)
    user_votes = await cruds.get_votes_for_user(db, current_user.id, "post", post_ids)

    return [
        services.build_post_list_item(post, author, answer_counts.get(post.id, 0), user_votes.get(post.id))
        for post in posts
    ]


@router.get("/users/{user_id}/answers", response_model=list[CommunityAnswerWithPost])
async def list_user_answers(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    author = await get_user_by_id(db, user_id)
    if not author:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    answers = await cruds.list_answers_by_author(db, user_id)
    votes = await cruds.get_votes_for_user(db, current_user.id, "answer", [a.id for a in answers])
    posts = await cruds.get_posts_by_ids(db, [a.post_id for a in answers])

    return [
        CommunityAnswerWithPost(
            post_id=answer.post_id,
            post_title=posts[answer.post_id].title if answer.post_id in posts else "",
            answer=services.build_answer_response(answer, author, votes.get(answer.id), []),
        )
        for answer in answers
    ]
