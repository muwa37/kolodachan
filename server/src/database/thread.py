from .util import Database


class Thread:

    def __init__(self):
        self.db = Database()
        self.conn = self.db.conn

    def create(self, tag: str) -> int:
        with self.conn.cursor() as cur:
            cur.execute(
                '''
                        INSERT INTO threads(board_id)
                        VALUES((SELECT id FROM BOARDS WHERE tag = %s))
                        RETURNING id
                        ''', (tag, ))
            thread_id = cur.fetchone()[0]
        self.conn.commit()

        return thread_id

    def get(self, tag, id):
        with self.conn.cursor() as cur:
            cur.execute(
                '''
                            SELECT p.thread_id
                            FROM posts as p
                            JOIN threads as t
                            ON p.thread_id = t.id
                            JOIN boards as b
                            ON t.board_id = b.id
                            WHERE p.post_number = %s AND b.tag = %s
                            ORDER BY p.creation_date ASC
                            LIMIT 1
                        ''', (id, tag))
            result = cur.fetchone()
        if not result:
            return

        return result[0]


if __name__ == "__main__":
    t = Thread()
    t.create('a')
