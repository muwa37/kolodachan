from psycopg import sql
from psycopg.rows import dict_row

from .util import Database


class Board:

    def __init__(self):
        self.db = Database()

    def create(self, tag: str, title: str, description: str):
        query = '''
            INSERT INTO boards (tag, title, description)
            VALUES(%s, %s, %s)
        '''
        self.db.execute('create', query, (tag, title, description))

    def get_all(self):
        query = '''
            SELECT
                tag,
                title
            FROM boards
            WHERE enabled = true
        '''
        result = self.db.execute('read', query, row_factory=dict_row)
        return result

    def get_one(self, tag: str):
        query = '''
            SELECT
                id,
                tag,
                title,
                description,
                default_nickname,
                allow_change_nickname,
                bumplimit,
                max_message_length,
                enabled
            FROM boards
            WHERE tag = %s AND enabled = true;
        '''
        result = self.db.execute('read', query, (tag, ), dict_row)

        if result['enabled']:
            return result

    def update(self, tag: str, data):
        conn = self.db.create_connection()
        with conn.cursor() as cur:
            for column, value in data.items():
                cur.execute(
                    sql.SQL('''UPDATE boards
                            SET {} = %s
                            WHERE name = %s''').format(sql.Identifier(column)),
                    (value, tag))
            conn.commit()
