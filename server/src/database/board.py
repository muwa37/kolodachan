from typing import List

from base import BaseDb


class Board(BaseDb):

    async def create(
        self,
        tag: str,
        title: str,
        description: str,
        default_name: str,
        name_change_allowed: bool,
        max_threads: int,
        bumplimit: int,
        max_message_length: int,
        allowed_file_types: List,
        max_file_size: int,
    ):
        query = \
            '''
                INSERT INTO boards(
                        tag,
                        title,
                        description,
                        default_name,
                        name_change_allowed,
                        max_threads,
                        bumplimit,
                        max_message_length,
                        allowed_file_types,
                        max_file_size,
                        )
                VALUES($1, $2, $3, $4, $5, $6, $8, $9, $10)
            '''
        values = (
            tag,
            title,
            description,
            default_name,
            name_change_allowed,
            max_threads,
            bumplimit,
            max_message_length,
            allowed_file_types,
            max_file_size,
        )
        await self._execute(query, values)

    async def get(self):
        query = \
            '''
            SELECT
                tag,
                title,
                description,
                default_name,
                name_change_allowed,
                bumplimit,
                max_message_length,
                max_file_size
            FROM boards
            WHERE enabled = true
        '''
        result = self.execute('read', query, row_factory=dict_row)
        return result

    def get_one(self, tag: str):
        query = '''
            SELECT
                id,
                tag,
                title,
                description,
                default_name,
                name_change_allowed,
                image,
                bumplimit,
                allowed_file_types,
                max_file_size
            FROM boards
            WHERE tag = $1
            '''
        return await self._execute(query, tag)

    async def update(
        self,
        new_tag: str,
        title: str,
        description: str,
        default_name: str,
        name_change_allowed: bool,
        max_threads: int,
        bumplimit: int,
        max_message_length: int,
        allowed_file_types: List,
        max_file_size: int,
        old_tag: str,
    ):

        query = \
            '''
                UPDATE boards
                    SET(tag = $1,
                        title = $2,
                        description = $3,
                        default_name = $4,
                        name_change_allowed = $5,
                        max_threads = $6,
                        bumplimit = $7,
                        max_message_length = $8,
                        allowed_file_types = %9,
                        max_file_size = $10)
                WHERE tag = $11
            '''

        values = (
            new_tag,
            title,
            description,
            default_name,
            name_change_allowed,
            max_threads,
            bumplimit,
            max_message_length,
            allowed_file_types,
            max_file_size,
            old_tag,
        )

        self._execute(query, values)
