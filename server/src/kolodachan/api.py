from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from kolodachan.database import PostgreInterface
from kolodachan.router import board, comment, file, thread
from kolodachan.util.files import FileHandler

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


app.include_router(board.router)
app.include_router(thread.router)
app.include_router(comment.router)
app.include_router(file.router)


@app.on_event('startup')
async def startup_event():
    app.state.db = PostgreInterface()
    await app.state.db.connect('config.toml')
    app.state.filehandler = FileHandler()
