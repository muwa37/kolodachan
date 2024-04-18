import asyncio
import tomllib

import asyncpg
from kolodachan.database.postgre import Board, Comment, Thread


class PostgreInterface:

    def __init__(self):
        self.board: Board

    async def connect(self, config: str):
        try:
            with open(config, 'rb') as file:
                config = tomllib.load(file)['postgres']
        except FileNotFoundError:
            print('config.toml not found')
            return False
        try:
            self.__pool = await asyncpg.create_pool(
                database=config['dbname'],
                user=config['user'],
                host=config['host'],
                port=config['port'],
                password=config['password'],
            )

        except asyncpg.exceptions.InvalidAuthorizationSpecificationError as e:
            print(e)
            return False

        self.board = Board(self.__pool)
        self.thread = Thread(self.__pool)
        self.comment = Comment(self.__pool)

        return True

    async def disconnect(self):
        await self.__pool.close()
