from typing import List, Optional

from fastapi import APIRouter, Body, File, HTTPException, Request, UploadFile
from kolodachan.database import PostgreInterface
from kolodachan.models import CommentCreate, ThreadRetrieve, ThreadsRetrieve
from kolodachan.util.files import FileHandler

router = APIRouter(prefix='/api/v1/board/{tag}/thread', tags=['thread'])


@router.get('/', response_model=ThreadsRetrieve)
async def get_multiple_threads(request: Request,
                               tag: str,
                               t_limit: int = 10,
                               t_offset: int = 0,
                               c_limit: Optional[int | None] = 3,
                               c_offset: int = 0,
                               c_reversed: bool = True):
    db: PostgreInterface = request.app.state.db
    board = await db.board.get_one(tag)
    if not board:
        raise HTTPException(404)
    threads = await db.thread.get_multiple(board.id, t_limit, t_offset,
                                           c_limit, c_offset, c_reversed)
    return threads


@router.get('/{thread_number}', response_model=ThreadRetrieve)
async def get_one_thread(request: Request,
                         tag: str,
                         thread_number: int,
                         c_limit: Optional[int | None] = None,
                         c_offset: int = 0,
                         c_reversed: bool = False):
    db: PostgreInterface = request.app.state.db
    board = await db.board.get_one(tag)
    if not board:
        raise HTTPException(404)
    thread = await db.thread.get_one(board.id, thread_number)
    if not thread:
        raise HTTPException(404)
    return thread


@router.post('/', status_code=201)
async def create_thread(request: Request,
                        tag: str,
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
        else:
            raise HTTPException(status_code=415)

    thread_number = await db.thread.create(board.id, comment, files)
    return thread_number
