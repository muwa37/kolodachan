import tomllib

import psycopg
from psycopg.rows import dict_row


class Database:

    def __init__(self):
        with open('.config.toml', 'rb') as f:
            data = tomllib.load(f)
        print(data)

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

    def update_board(self):
        pass

    def delete_board(self):
        pass

    def _create_connection(self):
        try:
            conn = psycopg.connect(
                host='192.168.0.108',
                port='5432',
                user='nkyume',
                password='Madoka10iz10',
                dbname='kolodachan',
            )

        except psycopg.DatabaseError as e:
            print(e)

        else:
            return conn


if __name__ == "__main__":
    db = Database()
