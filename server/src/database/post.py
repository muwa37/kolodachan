from .util import Database


class Post:

    def __init__(self):
        self.db = Database()
        self.conn = self.db.conn

    def create(self, thread_id, post):
        with self.conn.cursor() as cur:
            cur.execute(
                '''
                INSERT INTO posts(thread_id, poster_name, title, message, sage)
                VALUES (%s, %s, %s, %s, %s)
                        ''',
                (thread_id, post['name'], post['title'], post['message'], post['sage']))
        self.conn.commit()
