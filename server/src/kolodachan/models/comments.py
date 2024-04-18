from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel

from .files import File


class CommentRetrieve(BaseModel):
    comment_number: int
    position_in_thread: int
    user_name: str
    title: str
    message: str
    files: Optional[List[File] | None] = None
    sage: bool
    creation_date: datetime


class CommentCreate(BaseModel):
    user_name: str
    title: str
    message: str
    sage: Optional[bool] = True
