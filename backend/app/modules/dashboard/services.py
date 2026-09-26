from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.dashboard import cruds


async def get_full_dashboard(db: AsyncSession, user_id: int) -> dict:
    return await cruds.get_dashboard_data(db, user_id)
