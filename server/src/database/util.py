import tomllib

import psycopg


class Database:
    def __init__(self, config):
        with open(f'{config}.toml', 'rb') as f:
            data = tomllib.load(f)['postgre']

        self.host = data['host']
        self.port = data['port']
        self.user = data['user']
        self.password = data['password']
        self.dbname = data['dbname']

    def create_connection(self):
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
