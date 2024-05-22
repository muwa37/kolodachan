from enum import Enum
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class RoleEnum(str, Enum):
    superadmin = 'superadmin'
    admin = 'admin'
    mocherator = 'mocherator'


class UserCreate(BaseModel):
    username: str
    password: str = Field(min_length=6)
    email: EmailStr
    role: RoleEnum


class UserRecieve(BaseModel):
    pid: UUID
    username: str
    hashed_password: bytes | None = None
    email: EmailStr
    role: RoleEnum
    is_active: bool
