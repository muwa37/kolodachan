import asyncio
from typing import Optional

from pydantic import BaseModel


class Comment(BaseModel):
    name: str
    title: str
    message: str
    sage: Optional[bool] = False


def databaser(comment: Comment):
    print(comment)


async def main():
    comment = {
        'name': 'Anpn',
        'title': 'tste',
        'message': 'hello',
        'sage': True
    }
    comment_model = Comment.parse_obj(comment)
    print(comment_model)
    comment_model.name = 'Anon'
    print(comment_model)
    print(*comment_model.dict().values())


if __name__ == "__main__":
    asyncio.run(main())
