from fastapi import HTTPException
from psycopg import sql
from psycopg.rows import dict_row

from .util import Database


class Board(Database):

    def create(self, tag: str, title: str, description: str):
        query = '''
            INSERT INTO boards (tag, title, description)
            VALUES(%s, %s, %s)
        '''
        self.execute('create', query, (tag, title, description))

    def get_all(self):
        query = '''
            SELECT
                tag,
                title,
                description,
                default_name,
                name_change_allowed,
                bumplimit,
                max_message_length,
                max_file_size
            FROM boards
            WHERE enabled = true
        '''
        result = self.execute('read', query, row_factory=dict_row)
        return result

    def get_one(self, tag: str):
        query = '''
            SELECT
                id,
                tag,
                title,
                description,
                default_name,
                name_change_allowed,
                bumplimit,
                max_message_length,
                max_file_size,
                enabled
            FROM boards
            WHERE tag = %s AND enabled = true;
        '''
        result = self.execute('read', query, (tag, ), dict_row)
        if not result:
            raise HTTPException(status_code=404,
                                detail=('Board does not exits'))
        if result[0]['enabled']:
            return result[0]

    def update(self, tag: str, data):
        conn = self.create_connection()
        with conn.cursor() as cur:
            for column, value in data.items():
                cur.execute(
                    sql.SQL('''UPDATE boards
                            SET {} = %s
                            WHERE name = %s''').format(sql.Identifier(column)),
                    (value, tag))
            conn.commit()
