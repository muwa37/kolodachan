import asyncio
import os
from random import choice, randint
from time import sleep

import faker
from kolodachan.database import PostgreInterface
from kolodachan.models import BoardCreate, CommentCreate, File


class DbFiller:

    def __init__(self):
        self.fake = faker.Faker()
        self.wordlist = self._set_wordlist()
        self.db = PostgreInterface()

    def _set_wordlist(self):
        try:
            with open('test/wordlist.txt') as f:
                wordlist = f.read()
        except FileNotFoundError:
            print(
                'wordlist.txt not found, using default sentence generator instead'
            )
            return

        return wordlist.split('\n')

    async def create_boards(self):
        boards = []
        b = BoardCreate(tag='b',
                        title='Бред',
                        description='Обсуждения без темы',
                        default_name='Аноним')
        boards.append(b)

        a = BoardCreate(tag='a',
                        title='Аниме',
                        description='Обсуждения аниме',
                        default_name='Канаме Мадока')

        boards.append(a)

        for board in boards:
            await self.db.board.create(board)

    def fake_comment(self, name) -> CommentCreate:
        if self.wordlist:
            message = self.fake.sentence(ext_word_list=self.wordlist,
                                         nb_words=randint(10, 50))
            if not randint(0, 5):
                title = self.fake.sentence(ext_word_list=self.wordlist,
                                           nb_words=randint(1, 5))
            else:
                title = ''

            if randint(0, 5):
                sage = False
            else:
                sage = True
        else:
            message = self.fake.sentence(nb_words=randint(10, 50))

            if not randint(0, 5):
                title = self.fake.sentence(nb_words=randint(1, 5))
            else:
                title = ''

            if randint(0, 5):
                sage = True
            else:
                sage = False

        comment = CommentCreate(user_name=name,
                                title=title,
                                message=message,
                                sage=sage)
        return comment

    def create_files(self):
        pass

    async def create_thread(self, board):
        comment = self.fake_comment(board.default_name)
        file = {
            'name': 'улиточка.png',
            'full_link': '822e0a4b-e607-4925-9745-c8448e60abbd.jpeg',
            'compressed_link': '822e0a4b-e607-4925-9745-c8448e60abbds.jpeg',
            'extension': 'image/jpeg',
            'size': 8991
        }
        file = File.parse_obj(file)
        files = [file]
        thread_nubmer = await self.db.thread.create(
            board.id,
            comment,
        )

        thread_id = await self.db.thread.get_one(board.id, thread_nubmer)

        for _ in range(randint(10, 500)):
            comment = self.fake_comment(board.default_name)
            files = None
            match randint(0, 4):
                case 0:
                    pass
                case 1:
                    files = [file]
                case 2:
                    files = [file, file]
                case 3:
                    files = [file, file, file]
                case 4:
                    files = [file, file, file, file]

            await self.db.comment.create(thread_id, comment, files)


async def main():
    filler = DbFiller()
    await filler.db.connect('config.toml')

    try:
        await filler.create_boards()
    except Exception as e:
        print(e)

    boards = await filler.db.board.get_many()
    for board in boards.boards:
        for _ in range(100):
            await filler.create_thread(board)
    await filler.db.disconnect()


if __name__ == "__main__":
    asyncio.run(main())
