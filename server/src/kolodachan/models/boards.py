from typing import List, Optional

from pydantic import BaseModel, PositiveInt


class BoardRetrieve(BaseModel):
    id: int
    tag: str
    title: str
    description: str
    default_name: str
    name_change_allowed: bool
    bumplimit: int
    max_message_length: int
    allowed_file_types: Optional[List[str] | None] = None
    max_file_size: int


class BoardsRetrieve(BaseModel):
    boards: List[BoardRetrieve]


class BoardCreate(BaseModel):
    tag: str
    title: str
    description: str
    default_name: Optional[str] = 'Anonymous'
    name_change_allowed: Optional[bool] = True
    max_threads: Optional[PositiveInt] = 100
    bumplimit: Optional[PositiveInt] = 500
    max_message_length: Optional[PositiveInt] = 8192
    allowed_file_types: Optional[List[str] | None] = [
        'image/png', 'image/jpeg', 'image/gif'
    ]
    max_file_size: Optional[PositiveInt] = 3145728
