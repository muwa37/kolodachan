import asyncio
import sys
from time import time

from kolodachan.database import PostgreInterface


async def main():
    start = time()
    await test()
    end = time()
    print(end - start)


async def test():
    db = PostgreInterface()
    await db.connect('config.toml')
    #    print(await db.board.get_many())
    result = await db.thread.get_multiple(1,
                                          10,
                                          0,
                                          comments_limit=3,
                                          reversed=True)
    for thread in result.threads:
        for comment in thread.comments:
            print(comment.files)


if __name__ == "__main__":
    asyncio.run(main())
