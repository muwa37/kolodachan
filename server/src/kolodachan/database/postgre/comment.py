from typing import Dict, List, Optional

from kolodachan.models import CommentCreate, File

from .base import BaseDb
from .queries import (CREATE_COMMENT_WITH_TN, CREATE_FILE, GET_MULTIPLE_FILES,
                      GET_ONE_COMMENT)


class Comment(BaseDb):

    async def create(self,
                     board_id: int,
                     thread_number: int,
                     comment: CommentCreate,
                     files: Optional[List[File] | None] = None) -> int:
        comment = await self._execute(CREATE_COMMENT_WITH_TN, board_id, thread_number,
                                      *comment.dict().values())
        comment_number = comment[0].get('comment_number')
        comment_id = comment[0].get('id')

        if files:
            for file in files:
                await self._execute(CREATE_FILE, comment_id,
                                    *file.dict().values())
        return {'comment_number': comment_number}

    async def get_one(self, board_id: int, comment_number: int) -> Dict:
        comment = await self._execute(GET_ONE_COMMENT, board_id,
                                      comment_number)
        files = await self._get_files(comment[0].get('id'))
        comment = dict(comment[0])
        comment['files'] = files
        return comment

    async def _get_files(self, comment_id) -> List[Dict]:
        files = await self._execute(GET_MULTIPLE_FILES, comment_id)
        files = [dict(file) for file in files]
        if not files:
            return None
        return files
