from .board import Board
from .comment import Comment
from .thread import Thread


class Database:

    def __init__(self):
        self.board = Board()
        self.thread = Thread()
        self.comment = Comment()
