from pydantic import BaseModel


class Post(BaseModel):
    name: str
    title: str
    message: str
