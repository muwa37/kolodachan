from .board import Board
from .post import Post
from .thread import Thread


class Database:
    
    def __init__(self):
        self.board = Board()
        self.thread = Thread()
        self.post = Post()
