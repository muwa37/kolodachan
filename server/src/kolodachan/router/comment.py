from typing import List

from fastapi import APIRouter, Body, File, HTTPException, Request, UploadFile
from kolodachan.database import PostgreInterface
from kolodachan.models import CommentCreate, CommentRetrieve
from kolodachan.util.files import FileHandler

router = APIRouter(prefix='/api/v1/board/{tag}', tags=['comment'])


@router.get("/comment/{id}", tags=['comment'], response_model=CommentRetrieve)
async def get_comment(request: Request, tag: str, id: int):
    db: PostgreInterface = request.app.state.db
    board = await db.board.get_one(tag)
    if not board:
        raise HTTPException(status_code=404)
    comment = await db.comment.get_one(board.id, id)
    if not comment:
        raise HTTPException(status_code=404)
    return comment


@router.post('/thread/{id}/', status_code=201)
async def create_comment(request: Request,
                         tag: str,
                         thread_number: int,
                         comment: CommentCreate = Body(...),
                         files: List[UploadFile] = File(..., max_length=4)):
    db: PostgreInterface = request.app.state.db
    board = await db.board.get_one(tag)
    if not board:
        raise HTTPException(status_code=404)
    if files:
        filehandler: FileHandler = request.app.state.filehandler
        if filehandler.validate_files(files, board):
            files = await filehandler.save_files(files)

    comment_number = await db.comment.create(board.id, thread_number, comment,
                                             files)
    return comment_number
