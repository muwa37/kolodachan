from psycopg.rows import dict_row

from .util import Database


class Post:

    def __init__(self):
        self.db = Database()

    def create(self, thread_id, post):
        query = '''
            INSERT INTO posts(thread_id, poster_name, title, message, sage)
            VALUES (%s, %s, %s, %s, %s)
            '''
        self.db.execute('create', query,
                        (thread_id, post['name'], post['title'],
                         post['message'], post['sage']))

    def get_multiple(self, threads_id):
        query = '''
            SELECT thread_id, post_id, post_number, title, message,
                poster_name, file, sage, creation_date
            FROM posts
            WHERE thread_id = ANY(%s)
            ORDER BY post_id
            '''
        result = self.db.execute('read', query, (list(threads_id), ), dict_row)
        return result

    def get_one(self, post_number):
        query = '''
            SELECT post_id, post_number, title, message,
                poster_name, file, sage, creation_date
            FROM posts
            WHERE post_number = post_number;
            '''
        result = self.db.execute('read', query, (post_number, ), dict_row)
        return result
