from database import Database
from fastapi import APIRouter, Response
from models import Comment, Threads

router = APIRouter(prefix='/boards', tags=['board'])
db = Database()


@router.get('/')
def get_boards():
    '''Retrive all avalible boards'''
    return db.board.get_all()


@router.get('/{tag}')
def get_board(tag: str):
    '''Retrive one board'''
    return db.board.get_one(tag)


@router.get("/{tag}/threads", tags=['thread'], response_model=Threads)
def get_treads(tag,
               response: Response,
               threads_limit: int = 10,
               threads_step: int = 0,
               comments_offset: int = -3):
    '''Retrive threads with comments from one board
        - **tag**: board tag **mandatory path parameter*
        - **threads_limit**: max number of threads **optional query parameter*
        - **threads_step**: number of thread to skip
        **optional query parameter*
        - **comment_offset**: number of comments to retrive for each thread
        **optional query parameter*
            - -3 retrive only last 3 comments
            - +3 retrive only first 3 comments
            - 0 retrive all comments
    '''

    board = db.board.get_one(tag)
    threads_id = db.thread.get_multiple(board['id'], threads_limit,
                                        threads_step)
    comments = db.comment.get_multiple(threads_id)
    threads = sort_threads(threads_id, comments, comments_offset)
    return threads


@router.get("/{tag}/threads/{thread_number}",
            tags=['thread', 'comment'],
            response_model=Threads)
def get_thread(tag: str,
               thread_number: int,
               response: Response,
               comments_offset: int = 0,
               comments_limit: int | None = None):
    """Retrive single thread with comments
    - **tag** board tag **mandatory path parameter*
    - **thread_number** thread number or number of first post in thread
        **mandatory path parameter*
    - **comments_offset** number of comments to skip
        **optional query parameter*
    - **comments_limit** number of comments to retrive
        **optional query parameter*
    """
    board = db.board.get_one(tag)
    thread_id = [db.thread.get(board['id'], thread_number)]
    comments = db.comment.get_multiple(thread_id)
    thread = sort_threads(thread_id, comments, comments_offset, comments_limit)
    return thread


@router.get("/{tag}/comment/{id}", tags=['comment'], response_model=Comment)
def get_comment(tag: str, id: int, response: Response):
    pass


def sort_threads(threads_id: list,
                 comments: dict,
                 comments_offset: int,
                 comments_limit: int | None = None):
    if comments_limit:
        comments_limit = comments_offset + comments_limit
    threads = []
    for id in threads_id:
        tmp_comments = [
            comment for comment in comments if comment['thread_id'] == id
        ]
        if not tmp_comments:
            continue

        sorted_comments = []
        sorted_comments.append(tmp_comments.pop(0))
        tmp_comments = tmp_comments[comments_offset:comments_limit]
        sorted_comments.extend(tmp_comments)
        thread = {
            'thread_number': sorted_comments[0]['comment_number'],
            'comments': sorted_comments
        }
        threads.append(thread)
    for thread in threads:
        for comment in thread['comments']:
            del comment['thread_id']
    return threads
