from fastapi import FastAPI
from fastapi.responses import FileResponse

app = FastAPI()
favicon_path = "favicon.ico"


@app.get("/{board}/")
async def get_board(board, t_skip=0, t_step=10, p_limit=3):
    tmp_threads = board[t_skip:t_skip + t_step]
    threads = []
    for thread in tmp_threads:
        threads.append(thread[0:1:] + thread[-p_limit::])
    return threads


def test():
    pass


@app.get("/{board}/{thread}")
async def get_thread(board, thread):
    """Returns thread"""
    return


@app.get("/{board}/{thread}/{post}")
async def get_post(board, thread, post):
    return {"board": board, "thread": thread, "post": post}


@app.get("/favicon.ico")
async def favicon():
    file_path = "favicon.ico"
    return FileResponse(path=file_path)
