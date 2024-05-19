from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordBearer
from kolodachan.database import PostgreInterface
from kolodachan.dependences.security import get_current_active_user
from kolodachan.models import (BoardCreate, BoardRetrieve, BoardsRetrieve,
                               UserRecieve)

router = APIRouter(prefix='/api/v1/boards', tags=['boards'])


@router.get('/', response_model=BoardsRetrieve)
async def get_multiple_boards(request: Request):
    db: PostgreInterface = request.app.state.db
    boards = await db.board.get_multiple()
    return boards


@router.get('/{tag}', response_model=BoardRetrieve)
async def get_one_board(tag: str, request: Request):
    db = request.app.state.db
    board = await db.board.get_one(tag)
    if not board:
        raise HTTPException(status_code=404)
    return board


@router.post('/')
async def create_board(
    board: BoardCreate,
    request: Request,
    user: Annotated[UserRecieve, Depends(get_current_active_user)],
):
    print(user.role)
    if not user.role == 'superadmin':
        raise HTTPException(status_code=403)

    db: PostgreInterface = request.app.state.db
    await db.board.create(board)
