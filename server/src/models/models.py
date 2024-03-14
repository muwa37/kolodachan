from pydantic import BaseModel


class Comment(BaseModel):
    name: str = 'Аноним'
    title: str = ''
    message: str = ''
    file: str = 'url'
    sage: bool = False


class Thread(BaseModel):
    thread_id: int
    comments: list[Comment]
