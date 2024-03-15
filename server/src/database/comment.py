from fastapi import HTTPException
from psycopg.rows import dict_row

from .util import Database


class Comment(Database):

    def create(self, thread_id, comment):
        query = '''
            INSERT INTO comments(
                    thread_id,
                    user_name,
                    title,
                    message,
                    file_link,
                    file_link_compressed,
                    original_file_name,
                    sage)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING comment_number
            '''
        comment_number = self.execute(
            'create and read', query,
            (thread_id, comment['name'], comment['title'], comment['message'],
             comment['file_link'], comment['file_link_compressed'],
             comment['original_file_name'], comment['sage']), dict_row)[0]
        return comment_number

    def get_multiple(self, threads_id):
        query = '''
            SELECT
                thread_id,
                comment_id,
                comment_number,
                title,
                message,
                user_name,
                file_link,
                file_link_compressed,
                original_file_name,
                sage,
                creation_date
            FROM comments
            WHERE thread_id = ANY(%s)
            ORDER BY comment_id
            '''
        result = self.execute('read', query, (list(threads_id), ), dict_row)
        return result

    def get_one(self, comment_number):
        query = '''
            SELECT
                comment_id,
                comment_number,
                title,
                message,
                user_name,
                file_link,
                file_link_compressed,
                original_file_name,
                sage,
                creation_date
            FROM comments
            WHERE comment_number = comment_number;
            '''
        result = self.execute('read', query, (comment_number, ), dict_row)
        if not result:
            raise HTTPException(status_code=404,
                                detail='Comment does not exits')
        return result[0]
