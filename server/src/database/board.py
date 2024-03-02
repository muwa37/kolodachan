import psycopg
from psycopg import sql
from psycopg.rows import dict_row
from util import Database


class Board:

    def __init__(self):
        self.db = Database('.config')

    def create(self, name, title, description):
        conn = self.db.create_connection()

        with conn.cursor() as cur:
            cur.execute(
                '''
                INSERT INTO boards (name, title, description)
                VALUES(%s, %s, %s)
                ''', (name, title, description))

            conn.commit()
            conn.close()

    def get(self, name):
        conn = self.db.create_connection()

        with conn.cursor(row_factory=dict_row) as cur:
            cur.execute(
                '''
                    SELECT
                        name,
                        title,
                        description,
                        default_nickname,
                        allow_change_nickname,
                        bumplimit,
                        max_message_length,
                        enabled
                    FROM boards
                    WHERE name = %s;
                        ''', (name, ))
            result = cur.fetchone()

        conn.close()

        if result['enabled']:
            return result

    def update(self, name, data):
        conn = self.db.create_connection()

        with conn.cursor() as cur:
            for column, value in data.items():
                print(column, value, name)
                cur.execute(
                    sql.SQL(
                        'UPDATE boards SET {} = %s WHERE name = %s').format(
                            sql.Identifier(column)), (value, name))
            conn.commit()
            conn.close()

    def delete(self):
        pass


if __name__ == "__main__":
    db = Board()
    test = {
        'title': 'games',
        'description': 'igraem v igrushki',
    }
    print(db.get('vg'))
    db.update('vg', test)
    print(db.get('vg'))
