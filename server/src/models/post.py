from pydantic import BaseModel


class Post(BaseModel):
    name: str = 'Anonymous'
    title: str = ''
    message: str
    sage: bool = False
