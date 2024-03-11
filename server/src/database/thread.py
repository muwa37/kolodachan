from .util import Database


class Thread:

    def __init__(self):
        self.db = Database()

    def create(self, board_id: int) -> int:
        query = '''
            INSERT INTO threads(board_id)
            VALUES(%s)
            RETURNING id
        '''
        thread_id = self.db.execute('create and read', query, (board_id, ))

        return thread_id[0]

    def get(self, board_id, post_number) -> int:
        query = '''
            SELECT p.thread_id
            FROM posts as p
            JOIN threads as t
            ON p.thread_id = t.id
            WHERE t.board_id = %s AND p.post_number = %s
            ORDER BY p.creation_date ASC
            LIMIT 1
        '''
        result = self.db.execute('read', query, (board_id, post_number))
        return result

    def get_multiple(self, board_id, limit, step) -> list:
        query = '''
            SELECT id
            FROM threads
            WHERE board_id = %s
            ORDER BY bump_date DESC
            LIMIT %s
            OFFSET %s
        '''
        result = self.db.execute('read', query, (board_id, limit, step))
        result = list([id[0] for id in result])
        return result
