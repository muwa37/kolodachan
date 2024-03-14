from database import Database
from fastapi import APIRouter, HTTPException, Response
from models import Comment, Thread

router = APIRouter(prefix='/boards', tags=['board'])
db = Database()


@router.get('/')
def get_boards():
    '''Retrive all avalible boards'''

    return db.board.get_all()


@router.get('/{tag}')
def get_board(tag):
    '''Retruve one board'''
    return db.board.get_one(tag)


@router.get("/{tag}/threads", tags=['thread'], response_model=Thread)
def get_treads(tag,
               response: Response,
               limit: int = 10,
               step: int = 0,
               comment_limit: int = -3):
    '''Retrive threads from one board
        - **tag**: board tag **mandatory path parameter*
        - **limit**: max number of threads **optional query parameter*
        - **step**: number of thread to skip **optional query parameter*
        - **comment_limit**: number of comments to retrive for each thread
        **optional query parameter*
            - -3 retrive only last 3 comments
            - +3 retrive only first 3 comments
            - 0 retrive all comments
    '''

    board = db.board.get_one(tag)
    if not board:
        raise HTTPException(status_code=404, detail='Board does not exist')
        return
    threads_id = db.thread.get_multiple(board['id'], limit, step)
    comments = db.comment.get_multiple(threads_id)
    threads = {}
    for id in threads_id:
        tmp_comments = [
            comment for comment in comments if comment['thread_id'] == id
        ]
        sorted_comments = []
        sorted_comments.append(tmp_comments.pop(0))
        tmp_comments = tmp_comments[comment_limit:]
        sorted_comments.extend(tmp_comments)
        threads[sorted_comments[0]['comment_number']] = sorted_comments
    for thread in threads.values():
        for comment in thread:
            del comment['thread_id']

    return threads


@router.get("/{tag}/threads/{thread_number}", tags=['thread', 'comment'])
def get_thread(tag: str, thread_number: int, response: Response):
    """Returns single thread"""
    board = db.board.get_one(tag)
    thread_id = db.thread.get(board['id'], thread_number)
    comments = db.comment.get_multiple(thread_id)
    print(comments)
    for comment in comments:
        del comment['thread_id']
    return comments


@router.get("/{tag}/comment/{id}")
def get_comment(tag, id, response: Response):
    pass
