from psycopg import sql
from psycopg.rows import dict_row

from .util import Database


class Board:

    def __init__(self):
        self._db = Database()

    def create(self, tag: str, title: str, description: str):
        conn = self._db.create_connection()

        with conn.cursor() as cur:
            cur.execute(
                '''
                INSERT INTO boards (tag, title, description)
                VALUES(%s, %s, %s)
                ''', (tag, title, description))

            conn.commit()
            conn.close()

    def get_all(self):
        conn = self._db.create_connection()

        with conn.cursor(row_factory=dict_row) as cur:
            cur.execute('''
                    SELECT
                        tag,
                        title
                    FROM boards
                    WHERE
                        enabled = true
                        ''')

            result = cur.fetchall()

        conn.close()
        return result

    def get_one(self, tag: str):
        conn = self._db.create_connection()

        with conn.cursor(row_factory=dict_row) as cur:
            cur.execute(
                '''
                    SELECT
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
                        ''', (tag, ))
            result = cur.fetchone()

        conn.close()

        if not result:
            return

        if result['enabled']:
            return result

    def update(self, tag: str, data):
        conn = self._db.create_connection()

        with conn.cursor() as cur:
            for column, value in data.items():
                print(column, value, tag)
                cur.execute(
                    sql.SQL(
                        'UPDATE boards SET {} = %s WHERE name = %s').format(
                            sql.Identifier(column)), (value, tag))
            conn.commit()
            conn.close()

    def delete(self, tag):
        conn = self._db.create_connection()

        with conn.cursor() as cur:
            cur.execute('UPDATE BOARDS SET enabled = false WHERE tag = %s',
                        (tag, ))


if __name__ == "__main__":
    db = Board()
    db.create('1', 'test', 'test')
