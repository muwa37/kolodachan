from database import Database
from fastapi import FastAPI, status
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
def get_treads(tag, t_skip=0, t_step=10, p_limit=3):
    '''Returns threads'''
    pass


@app.get("/boards/{tag}/threads/{id}")
def get_thread(board, thread):
    """Returns single thread"""
    return


@app.post('/boards/{tag}/threads', status_code=201)
def create_thread(tag, post: Post):
    post = post.dict()
    id = db.thread.create(tag)
    db.post.create(id, post)


@app.post('/board/{tag}/threads/{id}}', status_code=201)
def create_post(tag, id, post: Post):
    # find thread_id where post_id == 1 (first) post in that thread
    # (probably temporary solution)
    thread_id = db.thread.get(tag, id)
    if not thread_id:
        return status.HTTP_404_NOT_FOUND
    print(thread_id)
    post = post.dict()
    db.post.create(thread_id, post)


@app.get("/boards/{tag}/threads/{id}/")
def get_post(board, thread, post):
    return {"board": board, "thread": thread, "post": post}
