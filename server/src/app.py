from database import Database
from fastapi import FastAPI
from fastapi.responses import FileResponse
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


@app.post('/boards/{tag}/threads')
def create_thread(tag, post: Post):
    post = post.dict()
    id = db.thread.create(tag)
    print(post)
    db.post.create(id, post)


@app.get("/boards/{tag}/threads/{id}/")
def get_post(board, thread, post):
    return {"board": board, "thread": thread, "post": post}
