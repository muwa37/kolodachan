from typing import List

from models.boards import BoardRecieve

from .base import BaseDb
from .queries import (CREATE_BOARD, DELETE_BOARD, ENABLE_BOARD, GET_BOARD,
                      GET_BOARDS, UPDATE_BOARD)


class Board(BaseDb):

    async def create(self, board: BoardRecieve):
        await self._execute(CREATE_BOARD, *tuple(board.dict().values()))

    async def get(self):
        return await self._execute(GET_BOARDS)

    async def get_one(self, tag: str):
        return await self._execute(GET_BOARD, tag)

    async def update(
        self,
        new_tag: str,
        title: str,
        description: str,
        default_name: str,
        name_change_allowed: bool,
        max_threads: int,
        bumplimit: int,
        max_message_length: int,
        allowed_file_types: List,
        max_file_size: int,
        old_tag: str,
    ):
        values = (
            new_tag,
            title,
            description,
            default_name,
            name_change_allowed,
            max_threads,
            bumplimit,
            max_message_length,
            allowed_file_types,
            max_file_size,
            old_tag,
        )

        self._execute(UPDATE_BOARD, values)

    async def enable(self, tag: str, state: bool):
        self._execute(ENABLE_BOARD, state, tag)

    async def delete(self, tag):
        self._execute(DELETE_BOARD, tag)
