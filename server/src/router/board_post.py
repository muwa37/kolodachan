from typing import Annotated

from database import Database
from fastapi import APIRouter, Form, HTTPException, Response, UploadFile

router = APIRouter(prefix='/boards', tags=['board'])

db = Database()


def save_file(file: UploadFile, board: dict):
    if file.content_type not in ['image/jpeg', 'image/png']:
        raise HTTPException(status_code=400, detail='Invalid file type')
    if file.size >= board['max_file_size']:
        raise HTTPException(
            status_code=400,
            detail=f'Size of file is more than {board["max_file_size"]}')
        print(file.filename, file.content_type, file.size)


@router.post('/{tag}/threads', status_code=201, tags=['thread'])
def create_thread(tag,
                  response: Response,
                  name: Annotated[str, Form()] = 'Аноним',
                  title: Annotated[str, Form()] = '',
                  message: Annotated[str, Form()] = '',
                  sage: Annotated[bool, Form()] = False,
                  file: UploadFile = None):

    board = db.board.get_one(tag)
    if file:
        save_file(file, board)
    comment = {'name': name, 'title': title, 'message': message, 'sage': sage}
    thread_id = db.thread.create(board['id'])

    if not comment['name'] == board['default_name'] and not board[
            'name_change_allowed']:
        comment['name'] = board['default_name']

    comment_number = db.comment.create(thread_id, comment)
    return comment_number


@router.post('/{tag}/file')
async def upload_file(tag: str, file: UploadFile):
    board = db.board.get_one(tag)
    if file.content_type not in ['image/jpeg', 'image/png']:
        raise HTTPException(status_code=400, detail='Invalid file type')
    if file.size >= board['max_file_size']:
        raise HTTPException(
            status_code=400,
            detail=f'Size of file is more than {board["max_file_size"]}')
    print(file.filename, file.content_type, file.size)


@router.post('/{tag}/threads/{thread_number}}',
             status_code=201,
             tags=['comment'])
def create_comment(tag,
                   thread_number,
                   response: Response,
                   name: str = Form(...),
                   title: str = Form(...),
                   message: str = Form(...),
                   sage: bool = Form(...),
                   file: UploadFile = None):

    board = db.board.get_one(tag)
    if file:
        if file.content_type not in ['image/jpeg', 'image/png']:
            raise HTTPException(status_code=400, detail='Invalid file type')
        if file.size >= board['max_file_size']:
            raise HTTPException(
                status_code=400,
                detail=f'Size of file is more than {board["max_file_size"]}')
        print(file.filename, file.content_type, file.size)

    comment = {'name': name, 'title': title, 'message': message, 'sage': sage}

    board = db.board.get_one(tag)
    thread_id = db.thread.get(board['id'], thread_number)
    print(thread_id)
    if not comment['name'] == board['default_name'] and not board[
            'name_change_allowed']:
        comment['name'] = board['default_name']

    comment_number = db.comment.create(thread_id, comment)
    return comment_number
