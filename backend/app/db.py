from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.pool import NullPool
import os
from dotenv import load_dotenv

load_dotenv()

# Use SQLite by default for easy testing
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./mathbac.db")

# SQLite-specific configuration
connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

# Logs every SQL statement — useful for debugging, but real overhead per request. Off by
# default; set SQL_ECHO=true in .env to turn it back on.
SQL_ECHO = os.getenv("SQL_ECHO", "false").lower() == "true"

engine_kwargs = {}
# On shared hosting (Passenger) connections idle out and the host caps them per user,
# so set DB_POOL=null there to open a fresh connection per request instead of pooling.
if os.getenv("DB_POOL", "").lower() == "null":
    engine_kwargs["poolclass"] = NullPool

engine = create_async_engine(
    DATABASE_URL,
    echo=SQL_ECHO,
    connect_args=connect_args,
    **engine_kwargs,
)
AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()