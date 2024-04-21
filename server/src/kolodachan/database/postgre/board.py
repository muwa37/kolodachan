from typing import Dict, List

from kolodachan.models import BoardCreate, BoardRetrieve, BoardsRetrieve

from .base import BaseDb
from .queries import (CREATE_BOARD, DELETE_BOARD, ENABLE_BOARD,
                      GET_MULTIPLE_BOARDS, GET_ONE_BOARD, UPDATE_BOARD)


class Board(BaseDb):

    async def create(self, board: BoardCreate):
        await self._execute(CREATE_BOARD, *board.dict().values())

    async def get_multiple(self) -> BoardsRetrieve:
        tmp_boards = await self._execute(GET_MULTIPLE_BOARDS)
        boards = [dict(board) for board in tmp_boards]
        boards = BoardsRetrieve(boards=boards)
        return boards

    async def get_one(self, tag: str) -> BoardRetrieve:
        board = await self._execute(GET_ONE_BOARD, tag)
        if not board:
            return
        board = BoardRetrieve(**dict(board[0]))
        return board

    async def update(self, tag: str, board: BoardCreate):
        await self._execute(UPDATE_BOARD, *board.dict().values(), tag)

    async def enable(self, tag: str, state: bool):
        await self._execute(ENABLE_BOARD, state, tag)

    async def delete(self, tag):
        print('Not implemented')
        return
        await self._execute(DELETE_BOARD, tag)
