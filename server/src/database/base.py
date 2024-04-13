from typing import List

import asyncpg
from asyncpg import Record


class BaseDb:

    def __init__(self, pool):
        self.__pool: asyncpg.Pool = pool

    async def _execute(self, query, *args) -> List[Record]:
        connection: asyncpg.Connection
        async with self.__pool.acquire() as connection:
            async with connection.transaction():
                result = await connection.fetch(query, *args)
        return result
