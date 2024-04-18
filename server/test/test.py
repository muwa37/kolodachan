import asyncio
import sys
from time import time

from src.database import PostgreInterface


async def main():
    start = time()
    await test()
    end = time()
    print(end - start)


async def test():
    db = PostgreInterface()
    await db.connect('config.toml')
    print(await db.board.get_many())


if __name__ == "__main__":
    asyncio.run(main())
