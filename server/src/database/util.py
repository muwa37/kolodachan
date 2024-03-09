import tomllib

import psycopg


class Database:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not isinstance(cls._instance, cls):
            cls._instance = object.__new__(cls, *args, **kwargs)
        return cls._instance

    def __init__(self):
        with open('../.config.toml', 'rb') as f:
            data = tomllib.load(f)['postgre']

        self.host = data['host']
        self.port = data['port']
        self.user = data['user']
        self.password = data['password']
        self.dbname = data['dbname']

        self.conn = psycopg.connect(
            host=self.host,
            port=self.port,
            user=self.user,
            password=self.password,
            dbname=self.dbname,
        )

    def create_connection(self) -> psycopg.Connection:
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
