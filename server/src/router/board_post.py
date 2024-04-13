from io import BytesIO
from typing import Annotated
from uuid import uuid4

from database import Database
from fastapi import APIRouter, Form, HTTPException, Response, UploadFile
from PIL import Image

router = APIRouter(prefix='/boards', tags=['board'])

db = Database()

Image.MAX_IMAGE_PIXELS = 16_000_000


async def save_as_image(file):
    extension = file.filename.split('.')[-1]
    link = uuid4()
    file = await file.read()
    link_full = f'{link}.{extension}'
    link_compressed = f'{link}s.{extension}'
    tumbnail = Image.open(BytesIO(file))
    x, y = tumbnail.size
    x, y = int(x * 0.1), int(y * 0.1)
    tumbnail = tumbnail.resize((x, y))
    tumbnail.save(f'../files/{link_compressed}', quality=10, optimize=True)

    with open(f'../files/{link_full}', 'wb') as f:
        f.write(file)

    return (link_full, link_compressed)


async def save_file(file: UploadFile, board: dict):
    if file.size >= board['max_file_size']:
        raise HTTPException(
            status_code=400,
            detail=f'Size of file is more than {board["max_file_size"]}')
    if file.content_type in ['image/jpeg', 'image/png']:
        return await save_as_image(file)

    raise HTTPException(status_code=400, detail='Invalid file type')


@router.post('/{tag}/threads', status_code=201, tags=['thread'])
async def create_thread(tag,
                        response: Response,
                        name: Annotated[str, Form()] = 'Аноним',
                        title: Annotated[str, Form()] = '',
                        message: Annotated[str, Form()] = '',
                        sage: Annotated[bool, Form()] = False,
                        file: UploadFile = None):
    '''
    Create thread and first comment in it
    '''
    file_name = None
    file_link = None

    board = db.board.get_one(tag)

    if file:
        file_name = file.filename
        file_link, file_link_compressed = await save_file(file, board)

    comment = {
        'name': name,
        'title': title,
        'message': message,
        'file_link': file_link,
        'file_link_compressed': file_link_compressed,
        'original_file_name': file_name,
        'sage': sage
    }
    thread_id = db.thread.create(board['id'])

    if not comment['name'] == board['default_name'] and not board[
            'name_change_allowed']:
        comment['name'] = board['default_name']

    comment_number = db.comment.create(thread_id, comment)
    return comment_number


@router.post('/{tag}/threads/{thread_number}}',
             status_code=201,
             tags=['comment'])
async def create_comment(tag,
                         thread_number,
                         response: Response,
                         name: str = Form(...),
                         title: str = Form(...),
                         message: str = Form(...),
                         sage: bool = Form(...),
                         file: UploadFile = None):
    '''
    Create comment in thread
    '''
    file_name = None
    file_link = None

    board = db.board.get_one(tag)

    if file:
        file_name = file.filename
        file_link, file_link_compressd = await save_file(file, board)

    comment = {
        'name': name,
        'title': title,
        'message': message,
        'file_link': file_link,
        'file_link_compressed': file_link_compressd,
        'original_file_name': file_name,
        'sage': sage
    }

    thread_id = db.thread.get(board['id'], thread_number)
    print(thread_id)
    if not comment['name'] == board['default_name'] and not board[
            'name_change_allowed']:
        comment['name'] = board['default_name']

    comment_number = db.comment.create(thread_id, comment)
    return comment_number


@router.post('/{tag}/file', deprecated=True)
async def upload_file(tag: str, file: UploadFile):
    board = db.board.get_one(tag)
    await save_file(file, board)
