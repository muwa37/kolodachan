from typing import List

import asyncpg
from asyncpg import Record
from pydantic import BaseModel


class BaseDb:

    def __init__(self, pool):
        self._pool = pool

    async def _execute(self, query, *args) -> List[Record]:
        connection: asyncpg.Connection
        async with self._pool.acquire() as connection:
            async with connection.transaction():
                result = await connection.fetch(query, *args)
        return result

    @staticmethod
    def _record_to_model(model: BaseModel, record: Record):
        return model.parse_obj(dict(record))
