from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.modules.auth.models import User
from app.modules.auth.schemas import DoctorCreate
from datetime import datetime


async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalars().first()


async def get_user_by_id(db: AsyncSession, user_id: int) -> User | None:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalars().first()


async def get_users_by_ids(db: AsyncSession, user_ids: list[int]) -> dict[int, User]:
    """One query for several users, instead of a separate lookup per user (avoids N+1)."""
    if not user_ids:
        return {}
    result = await db.execute(select(User).where(User.id.in_(set(user_ids))))
    return {user.id: user for user in result.scalars().all()}


async def create_user(db: AsyncSession, data: DoctorCreate) -> User:
    from app.modules.auth.services import hash_password, is_admin_email
    user = User(
        fullName=data.fullName,
        email=data.email,
        hashed_password=hash_password(data.password),
        stream=data.stream,
        is_admin=is_admin_email(data.email),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


async def update_user(db: AsyncSession, user: User, **kwargs) -> User:
    for field, value in kwargs.items():
        if hasattr(user, field) and value is not None:
            setattr(user, field, value)
    user.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(user)
    return user


async def get_all_users(db: AsyncSession) -> list[User]:
    result = await db.execute(select(User))
    return result.scalars().all()
