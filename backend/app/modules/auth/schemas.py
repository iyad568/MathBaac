from datetime import datetime

from pydantic import BaseModel, EmailStr, Field, model_validator
from typing import Optional


class DoctorCreate(BaseModel):
    fullName: str
    email: EmailStr
    password: str
    confirmPassword: str
    stream: Optional[str] = None

    @model_validator(mode="after")
    def passwords_match(self) -> "DoctorCreate":
        if self.password != self.confirmPassword:
            raise ValueError("Passwords do not match")
        return self


class DoctorLogin(BaseModel):
    email: EmailStr
    password: str

    class Config:
        from_attributes = True


class DoctorResponse(BaseModel):
    id: int
    fullName: str
    email: EmailStr
    is_admin: bool = False
    stream: Optional[str] = None
    token: Optional[str] = None
    isLoggedIn: bool = True
    createdAt: Optional[datetime] = Field(
        default=None,
        validation_alias="created_at",
        serialization_alias="createdAt",
    )

    model_config = {"from_attributes": True, "populate_by_name": True}


class DoctorProfileUpdate(BaseModel):
    fullName: Optional[str] = None
    stream: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    email: str

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None
    token_type: str = "bearer"
    doctor: DoctorResponse

    class Config:
        from_attributes = True


class RefreshRequest(BaseModel):
    refresh_token: str
