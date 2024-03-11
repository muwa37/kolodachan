from database import Database
from fastapi import FastAPI, Response, status
from models import Post

app = FastAPI()

db = Database()


@app.get('/boards')
def get_boards():
    '''Returns boards'''

    return db.board.get_all()


@app.get('/boards/{tag}')
def get_board(tag):
    '''Returns board'''
    return db.board.get_one(tag)


@app.get("/boards/{tag}/threads")
def get_treads(tag,
               response: Response,
               limit: int = 10,
               step: int = 0,
               posts_limit: int = 3):
    '''Returns threads'''
    board = db.board.get_one(tag)
    if not board:
        response.status_code = status.HTTP_404_NOT_FOUND
        return
    threads_id = db.thread.get_multiple(board['id'], limit, step)
    posts = db.post.get_multiple(threads_id)
    threads = {}
    for id in threads_id:
        tmp_posts = [post for post in posts if post['thread_id'] == id]
        sorted_posts = []
        sorted_posts.append(tmp_posts.pop(0))
        tmp_posts = tmp_posts[-posts_limit:]
        sorted_posts.extend(tmp_posts)
        threads[sorted_posts[0]['post_number']] = sorted_posts
    for thread in threads.values():
        for post in thread:
            del post['thread_id']

    return threads


@app.get("/boards/{tag}/threads/{id}")
def get_thread(board, thread):
    """Returns single thread"""
    return


@app.post('/boards/{tag}/threads', status_code=201)
def create_thread(tag, post: Post, response: Response):
    board = db.board.get_one(tag)
    if not board:
        response.status_code = status.HTTP_404_NOT_FOUND
        return

    post = post.dict()
    thread_id = db.thread.create(board['id'])
    if not post['name'] == board['default_nickname'] and not board[
            'allow_change_nickname']:
        post['name'] = board['default_nickname']

    db.post.create(thread_id, post)


@app.post('/board/{tag}/threads/{id}}', status_code=201)
def create_post(tag, id, post: Post, response: Response):
    # find thread_id where post_id == 1 (first) post in that thread
    # (probably temporary solution)
    thread_id = db.thread.get(tag, id)
    if not thread_id:
        response.status_code = status.HTTP_404_NOT_FOUND
        return

    post = post.dict()
    board = db.board.get_one(tag)
    if not post['name'] == board['default_nickname'] and not board[
            'allow_change_nickname']:
        post['name'] = board['default_nickname']

    db.post.create(thread_id, post)


@app.get("/boards/{tag}/threads/{id}/")
def get_post(board, thread, post):
    return {"board": board, "thread": thread, "post": post}
