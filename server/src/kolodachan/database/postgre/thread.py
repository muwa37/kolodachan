from typing import List

from asyncpg import Connection, Record
from kolodachan.models import (CommentCreate, File, ThreadRetrieve,
                               ThreadsRetrieve)

from .base import BaseDb
from .queries import (CREATE_COMMENT, CREATE_FILE, CREATE_THREAD,
                      GET_MULTIPLE_COMMENTS, GET_MULTIPLE_THREADS,
                      GET_ONE_THREAD)


class Thread(BaseDb):

    async def create(self,
                     board_id: int,
                     comment: CommentCreate,
                     files: List[File] | None = None) -> int:
        connection: Connection
        async with self._pool.acquire() as connection:
            async with connection.transaction():
                thread: List[Record] = await connection.fetch(
                    CREATE_THREAD, board_id)
                thread_id = thread[0].get('id')

                comment = await connection.fetch(CREATE_COMMENT, thread_id,
                                                 *comment.dict().values())
                if files:
                    comment_id = comment[0].get('id')
                    for file in files:
                        await connection.execute(CREATE_FILE, comment_id,
                                                 *file.dict().values())
        return comment[0].get('comment_number')

    async def get_multiple(self, board_id: int, limit: int,
                           offset: int) -> ThreadsRetrieve:
        result: Record = await self._execute(GET_MULTIPLE_THREADS, board_id,
                                             limit, offset)
        tmp_threads = [thread for thread in dict(result).values()]
        threads = []
        for tmp_thread in tmp_threads:
            tmp_comments = await self._execute(GET_MULTIPLE_COMMENTS,
                                               tmp_thread['thread_id'])
            comments = [
                self._record_to_model(CommentCreate, comment)
                for comment in tmp_comments
            ]
            thread = ThreadRetrieve(thread_number=comments[0].comment_number,
                                    comments=comments)
            threads.append(thread)

        return ThreadsRetrieve(threads=threads)

    async def get_one(self, board_id: int, open_post_number: int) -> int:
        thread = await self._execute(GET_ONE_THREAD,board_id, open_post_number)
        return thread[0].get('id')

    @staticmethod
    def _sort_threads(threads_id: list,
                      comments: dict,
                      comments_offset: int,
                      comments_limit: int | None = None):
        if comments_limit:
            comments_limit = comments_offset + comments_limit
        threads = []
        for id in threads_id:
            tmp_comments = [
                comment for comment in comments if comment['thread_id'] == id
            ]
            if not tmp_comments:
                continue

            sorted_comments = []
            sorted_comments.append(tmp_comments.pop(0))
            tmp_comments = tmp_comments[comments_offset:comments_limit]
            sorted_comments.extend(tmp_comments)
            thread = {
                'thread_number': sorted_comments[0]['comment_number'],
                'comments': sorted_comments
            }
            threads.append(thread)
        for thread in threads:
            for comment in thread['comments']:
                del comment['thread_id']
        return threads
