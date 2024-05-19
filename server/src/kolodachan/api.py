import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from kolodachan.auth import auth
from kolodachan.database import PostgreInterface
from kolodachan.router import board, comment, file, thread, user
from kolodachan.util.files import FileHandler

load_dotenv()
db_url = os.getenv('DB_URL')

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/prikol')
async def free_bitcoins():
    return RedirectResponse(url="https://www.youtube.com/watch?v=dQw4w9WgXcQ")


app.include_router(auth.router)
app.include_router(user.router)
app.include_router(board.router)
app.include_router(thread.router)
app.include_router(comment.router)
app.include_router(file.router)


@app.on_event('startup')
async def startup_event():
    if not os.path.exists('files'):
        os.mkdir('files')
    app.state.db = PostgreInterface()
    await app.state.db.connect(db_url)
    app.state.filehandler = FileHandler()


@app.on_event('shutdown')
async def shutdown_event():
    await app.state.db.disconnect()
