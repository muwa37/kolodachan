import json
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, model_validator

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
    sage: Optional[bool] = False

    @model_validator(mode='before')
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value
