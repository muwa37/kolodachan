from typing import List

from pydantic import BaseModel

from .comments import CommentSend


class Thread(BaseModel):
    thread_number: int
    comments: List[CommentSend]


class Threads(BaseModel):
    threads: List[Thread]
