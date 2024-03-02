import tomllib

import psycopg
from psycopg import sql
from psycopg.rows import dict_row


class Database:

    def __init__(self):
        with open('.config.toml', 'rb') as f:
            data = tomllib.load(f)['postgre']

        self.host = data['host']
        self.port = data['port']
        self.user = data['user']
        self.password = data['password']
        self.dbname = data['dbname']

    def create_board(self, name, title, description):
        conn = self._create_connection()

        with conn.cursor() as cur:
            cur.execute(
                '''
                INSERT INTO boards (name, title, description)
                VALUES(%s, %s, %s)
                ''', (name, title, description))

            conn.commit()
            conn.close()

    def get_board(self, name):
        conn = self._create_connection()

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
                        max_message_length
                    FROM boards
                    WHERE name = %s;
                        ''', (name, ))
            result = cur.fetchone()

            return result

    def update_board(self, name, data):
        conn = self._create_connection()

        with conn.cursor() as cur:
            for column, value in data.items():
                print(column, value, name)
                cur.execute(
                    sql.SQL(
                        'UPDATE boards SET {} = %s WHERE name = %s').format(
                            sql.Identifier(column)), (value, name))
            conn.commit()
            conn.close()

    def delete_board(self):
        pass

    def _create_connection(self):
        try:
            conn = psycopg.connect(
                host=self.host,
                port=self.port,
                user=self.user,
                password=self.password,
                dbname=self.dbname,
            )

        except psycopg.DatabaseError as e:
            print(e)

        else:
            return conn


if __name__ == "__main__":
    db = Database()
    test = {
        'title': 'games',
        'description': 'igraem v igrushki',
    }
    print(db.get_board('vg'))
    db.update_board('vg', test)
    print(db.get_board('vg'))
