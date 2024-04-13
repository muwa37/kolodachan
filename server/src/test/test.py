import asyncio
import tomllib
from time import time

import asyncpg


async def main():
    start = time()
    await test()
    end = time()
    print(end - start)


async def connect() -> asyncpg.Connection:
    with open('config.toml', 'rb') as file:
        config = tomllib.load(file)['postgre']

    connection = await asyncpg.connect(
        database=config['dbname'],
        user=config['user'],
        host=config['host'],
        port=config['port'],
        password=config['password'],
    )

    return connection


async def test():
    connection: asyncpg.Connection = await connect()
    query = \
        '''
        INSERT INTO comments(
                thread_id,
                user_name,
                title,
                message,
                file_link,
                file_link_compressed,
                original_file_name,
                sage)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        '''
    values = (50, 'Name', 'test', 'test message', '', '', '', False)
    for _ in range(100):
        async with connection.transaction():
            result = await connection.execute(query, *values)


if __name__ == "__main__":
    asyncio.run(main())
