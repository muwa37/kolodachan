from typing import List

from pydantic import BaseModel

from .comments import CommentRetrieve


class ThreadRetrieve(BaseModel):
    thread_number: int
    comments: List[CommentRetrieve]


class ThreadsRetrieve(BaseModel):
    threads: List[ThreadRetrieve]
