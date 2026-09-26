# MathBac Backend

FastAPI backend for the MathBac educational platform.

## Quick Start with SQLite

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Initialize the Database

```bash
python init_db.py
```

This will create a `mathbac.db` SQLite database file with all necessary tables.

### 3. Run the Server

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at:
- API: http://localhost:8000
- Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Configuration

The `.env` file contains:
- `DATABASE_URL`: Database connection string (defaults to SQLite)
- `SECRET_KEY`: JWT secret key for authentication
- `CORS_ORIGINS`: Allowed origins for CORS

## Database

The project is configured to use SQLite by default for easy testing. To switch to PostgreSQL:

1. Update `DATABASE_URL` in `.env`:
   ```
   DATABASE_URL=postgresql+asyncpg://user:password@localhost/dbname
   ```

2. Run migrations:
   ```bash
   alembic upgrade head
   ```

## API Modules

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Dashboard (`/api/dashboard`)
- User activity tracking
- Study streak management
- Progress analytics

## Development

### Database Migrations

Create a new migration:
```bash
alembic revision --autogenerate -m "description"
```

Apply migrations:
```bash
alembic upgrade head
```

### Testing the API

You can test the API using:
1. Swagger UI: http://localhost:8000/docs
2. curl or Postman
3. Frontend application

Example registration:
```bash
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User"
  }'
```
