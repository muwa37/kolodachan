from typing import Dict, List, Optional

from asyncpg import Connection, Record
from kolodachan.models import (CommentCreate, CommentRetrieve, File,
                               ThreadRetrieve, ThreadsRetrieve)

from .base import BaseDb
from .queries import (CREATE_COMMENT, CREATE_FILE, CREATE_THREAD,
                      GET_MULTIPLE_COMMENTS, GET_MULTIPLE_COMMENTS_REVERSED,
                      GET_MULTIPLE_FILES, GET_MULTIPLE_THREADS, GET_ONE_THREAD)


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
        return {'thread_number': comment[0].get('comment_number')}

    async def get_multiple(self,
                           board_id: int,
                           limit: int,
                           offset: int,
                           comments_limit: Optional[int | None] = None,
                           comments_offset: int = 0,
                           reversed: bool = False) -> ThreadsRetrieve:

        result = await self._execute(GET_MULTIPLE_THREADS, board_id, limit,
                                     offset)
        tmp_threads = [thread for thread in result]
        threads = []

        for open_post in tmp_threads:
            open_post = dict(open_post)
            comments = await self._get_comments(open_post['thread_id'],
                                                comments_limit,
                                                comments_offset, reversed)

            # inserting openpost at the start of list if we didn't take it from _get_comments funciton
            if not comments[0]['position_in_thread'] == 0:
                open_post['files'] = await self._get_files(open_post['id'])
                comments.insert(0, open_post)

            thread = {
                'thread_number': comments[0]['comment_number'],
                'comments': comments
            }
            threads.append(thread)

        return ThreadsRetrieve(threads=threads)

    async def get_one(self,
                      board_id: int,
                      open_post_number: int,
                      comments_limit: Optional[bool | None] = None,
                      comments_offset: int = 0,
                      reversed: bool = False) -> ThreadRetrieve:

        thread = await self._execute(GET_ONE_THREAD, board_id,
                                     open_post_number)
        open_post = dict(thread[0])
        comments = await self._get_comments(open_post['thread_id'],
                                            comments_limit, comments_offset)
        if not comments[0]['position_in_thread'] == 0:
            open_post['files'] = self._get_files(open_post['id'])
            comments.insert(0, open_post)

        return ThreadRetrieve(thread_number=comments[0]['comment_number'],
                              comments=comments)

    async def _get_comments(self,
                            thread_id: int,
                            limit: Optional[bool | None] = None,
                            offset: int = 0,
                            reversed: bool = False) -> List[Dict]:

        if reversed:
            tmp_comments = await self._execute(GET_MULTIPLE_COMMENTS_REVERSED,
                                               thread_id, limit, offset)
            tmp_comments.reverse()
        else:
            tmp_comments = await self._execute(GET_MULTIPLE_COMMENTS,
                                               thread_id, limit, offset)

        comments = [dict(comment) for comment in tmp_comments]
        for comment in comments:
            files = await self._get_files(comment['id'])
            if not files:
                continue
            comment['files'] = files

        return comments

    async def _get_files(self, comment_id) -> List[Dict]:
        files = await self._execute(GET_MULTIPLE_FILES, comment_id)
        files = [dict(file) for file in files]
        if not files:
            return None
        return files
