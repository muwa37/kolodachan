from kolodachan.database.postgre.base import BaseDb
from kolodachan.database.postgre.queries import (CREATE_USER, GET_ONE_USER,
                                                 GET_USER_BY_SESSION)
from kolodachan.models import UserCreate, UserRecieve


class User(BaseDb):

    async def create(self, user: UserCreate):
        await self._execute(CREATE_USER, *user.dict().values())

    async def get(self, username) -> UserRecieve:
        user = await self._execute(GET_ONE_USER, username)
        if not user:
            return

        return UserRecieve.parse_obj(dict(user[0]))

    async def get_by_session(self, token: str) -> UserRecieve:
        user = await self._execute(GET_USER_BY_SESSION, token)
        user = dict(user[0])
        return UserRecieve.parse_obj(user)

    async def delete(self, username):
        ...
