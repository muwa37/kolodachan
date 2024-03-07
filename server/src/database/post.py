from .util import Database


class Post(Database):

    def create(self, thread_id, post):
        conn = self.create_connection()

        with conn.cursor() as cur:
            cur.execute(
                '''
                        INSERT INTO posts(thread_id, name, title, message)
                        VALUES (%s, %s, %s, %s)
                        ''',
                (thread_id, post['name'], post['title'], post['message']))
        conn.commit()
        conn.close()
