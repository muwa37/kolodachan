from fastapi import FastAPI
from router import board_get, board_post

app = FastAPI()

app.include_router(board_get.router)
app.include_router(board_post.router)
