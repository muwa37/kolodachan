import asyncio
import tomllib

import asyncpg
from board import Board


class Database:

    def __init__(self):
        self.__pool: asyncpg.Pool

        self.board: Board

    async def connect(self):
        try:
            with open('config.toml', 'rb') as file:
                config = tomllib.load(file)['postgre']
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
        return True

    async def disconnect(self):
        await self.pool.close()


async def test():
    db = Database()
    await db.connect()
    print(await db.board.get())
    await db.board.update(
        'a',
        'anime',
        'jopa',
        'Акеми Хомура',
        False,
        '50',
        '500',
        '8192',
        ['.png', '.jpg'],
    )


if __name__ == "__main__":
    asyncio.run(test())
