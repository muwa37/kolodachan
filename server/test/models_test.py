import asyncio
from typing import Optional

from pydantic import BaseModel


class Comment(BaseModel):
    name: str
    title: str
    message: str
    sage: Optional[bool] = False


class Prikol(BaseModel):
    test: int
    comment: Comment


def databaser(comment: Comment):
    print(comment)


def main():
    comment = {
        'name': 'Anpn',
        'title': 'tste',
        'message': 'hello',
        'sage': True
    }
    prikol = {'test': 123, 'comment': comment}

    prikol_obj = Prikol.parse_obj(prikol)
    print(prikol_obj)


if __name__ == "__main__":
    main()
