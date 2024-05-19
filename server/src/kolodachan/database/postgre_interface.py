import asyncpg
from kolodachan.database.postgre import Board, Comment, Session, Thread, User


class PostgreInterface:

    async def connect(self, db_url: str) -> bool:
        try:
            self.__pool = await asyncpg.create_pool(db_url)
        except asyncpg.exceptions.InvalidAuthorizationSpecificationError as e:
            print(e)
            return False

        self.board = Board(self.__pool)
        self.thread = Thread(self.__pool)
        self.comment = Comment(self.__pool)
        self.user = User(self.__pool)
        self.session = Session(self.__pool)

        return True

    async def disconnect(self):
        await self.__pool.close()
