from kolodachan.database.postgre.base import BaseDb
from kolodachan.database.postgre.queries import CREATE_SESSION
from kolodachan.models.sessions import SessionCreate


class Session(BaseDb):

    async def create(self, session: SessionCreate) -> None:
        await self._execute(CREATE_SESSION, *dict(session).values())
