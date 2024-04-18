from datetime import datetime
from typing import List

from pydantic import BaseModel, Optional

from .files import File


class CommentSend(BaseModel):
    comment_number: int
    comment_id: int
    user_name: str
    title: str
    message: str
    files: Optional[List[File] | None] = None
    sage: bool
    creation_date: datetime


class CommentRecieve(BaseModel):
    user_name: str
    title: str
    message: str
    files: Optional[List[File] | None] = None
    sage: Optional[bool] = True
