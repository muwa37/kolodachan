from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    username: str
    password: str = Field(min_length=6)
    email: EmailStr
    role: str


class UserRecieve(BaseModel):
    pid: UUID
    username: str
    hashed_password: bytes | None = None
    email: EmailStr
    role: str
    is_active: bool
