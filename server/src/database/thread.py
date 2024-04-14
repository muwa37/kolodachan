from asyncpg import Connection, Record
from base import BaseDb
from models.comments import CommentRecieve
from queries import CREATE_COMMENT, CREATE_THREAD, GET_THREAD, GET_THREADS


class Thread(BaseDb):

    async def create(self, board_id: int, comment: CommentRecieve) -> int:
        connection: Connection
        async with self._pool.acquire() as connection:
            async with connection.transaction():
                thread_id: Record = connection.fetch(CREATE_THREAD, board_id)

                connection.execute(CREATE_COMMENT, )
