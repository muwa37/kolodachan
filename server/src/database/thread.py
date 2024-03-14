from fastapi import HTTPException

from .util import Database


class Thread(Database):

    def create(self, board_id: int) -> int:
        query = '''
            INSERT INTO threads(board_id)
            VALUES(%s)
            RETURNING id
        '''
        thread_id = self.execute('create and read', query, (board_id, ))[0]

        return thread_id[0]

    def get(self, board_id, post_number) -> int:
        query = '''
            SELECT c.thread_id
            FROM comments as c
            JOIN threads as t
            ON c.thread_id = t.id
            WHERE t.board_id = %s
                AND c.comment_number = %s
                AND c.comment_id = 0
            ORDER BY c.creation_date ASC
        '''
        result = self.execute('read', query, (board_id, post_number))
        if not result:
            raise HTTPException(status_code=404,
                                detail='Thread does not exitst')
        return result[0][0]

    def get_multiple(self, board_id, limit, step) -> list:
        query = '''
            SELECT id
            FROM threads
            WHERE board_id = %s
            ORDER BY bump_date DESC
            LIMIT %s
            OFFSET %s
        '''
        result = self.execute('read', query, (board_id, limit, step))
        result = list([id[0] for id in result])
        return result
