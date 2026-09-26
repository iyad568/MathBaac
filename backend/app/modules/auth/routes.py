from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import get_db
from app.modules.auth import schemas, cruds, services
from app.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=schemas.TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(data: schemas.DoctorCreate, db: AsyncSession = Depends(get_db)):
    existing = await cruds.get_user_by_email(db, data.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    user = await cruds.create_user(db, data)
    token_data = {"sub": str(user.id), "email": user.email}

    return schemas.TokenResponse(
        access_token=services.create_access_token(token_data),
        refresh_token=services.create_refresh_token(token_data),
        token_type="bearer",
        doctor=schemas.DoctorResponse.model_validate(user),
    )


@router.post("/login", response_model=schemas.TokenResponse)
async def login(data: schemas.DoctorLogin, db: AsyncSession = Depends(get_db)):
    user = await services.authenticate_user(db, data.email, data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token_data = {"sub": str(user.id), "email": user.email}

    return schemas.TokenResponse(
        access_token=services.create_access_token(token_data),
        refresh_token=services.create_refresh_token(token_data),
        token_type="bearer",
        doctor=schemas.DoctorResponse.model_validate(user),
    )


@router.post("/refresh", response_model=schemas.TokenResponse)
async def refresh_token(data: schemas.RefreshRequest, db: AsyncSession = Depends(get_db)):
    payload = services.verify_token(data.refresh_token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
        )

    user_id = payload.get("sub")
    user = await cruds.get_user_by_id(db, int(user_id))
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    token_data = {"sub": str(user.id), "email": user.email}

    return schemas.TokenResponse(
        access_token=services.create_access_token(token_data),
        refresh_token=services.create_refresh_token(token_data),
        token_type="bearer",
        doctor=schemas.DoctorResponse.model_validate(user),
    )


@router.get("/me", response_model=schemas.DoctorResponse)
async def get_me(current_user=Depends(get_current_user)):
    return schemas.DoctorResponse.model_validate(current_user)


@router.put("/me", response_model=schemas.DoctorResponse)
async def update_me(
    data: schemas.DoctorProfileUpdate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    updated = await cruds.update_user(
        db,
        current_user,
        fullName=data.fullName,
        stream=data.stream,
    )
    return schemas.DoctorResponse.model_validate(updated)
