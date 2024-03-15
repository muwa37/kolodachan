from datetime import datetime
from typing import List

from pydantic import BaseModel, RootModel


class Comment(BaseModel):
    comment_id: int
    comment_number: int
    user_name: str
    title: str
    message: str
    file_link: str | None
    file_link_compressed: str | None
    original_file_name: str | None
    sage: bool
    creation_date: datetime


class Thread(BaseModel):
    thread_number: int
    comments: List[Comment]


class Threads(RootModel):
    root: List[Thread]
