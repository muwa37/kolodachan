from fastapi import APIRouter, HTTPException, Request
from kolodachan.database import PostgreInterface
from kolodachan.models import BoardRetrieve, BoardsRetrieve

router = APIRouter(prefix='/api/v1/board', tags=['board'])


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
