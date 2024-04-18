from typing import List, Optional

from kolodachan.models import CommentCreate, File

from .base import BaseDb
from .queries import CREATE_COMMENT, CREATE_FILE


class Comment(BaseDb):

    async def create(self,
                     thread_id: int,
                     comment: CommentCreate,
                     files: Optional[List[File] | None] = None) -> int:
        comment = await self._execute(CREATE_COMMENT, thread_id,
                                      *comment.dict().values())
        comment_number = comment[0].get('comment_number')
        comment_id = comment[0].get('id')

        if files:
            for file in files:
                await self._execute(CREATE_FILE, comment_id,
                                    *file.dict().values())
        return comment_number
