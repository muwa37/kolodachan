from .util import Database


class Thread(Database):

    def create(self, tag: str) -> int:
        conn = self.create_connection()
        with conn.cursor() as cur:
            cur.execute(
                '''
                        INSERT INTO threads(board_id)
                        VALUES((SELECT id FROM BOARDS WHERE tag = %s))
                        RETURNING id
                        ''', (tag, ))
            thread_id = cur.fetchone()[0]
        conn.commit()
        conn.close()

        return thread_id


if __name__ == "__main__":
    t = Thread()
    t.create('a')
