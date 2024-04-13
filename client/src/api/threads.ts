import { Thread } from '@/types';
import { getOneBoard } from './boards';

export function getThreads() {
  const threads: Thread[] = [
    {
      id: '0',
      title: 'a 1st thread',
      board: 'a',
      text: 'sample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread description',
      attachments: [
        { link: 'url/1337', name: 'sample img name' },
        { link: 'url/322', name: 'sample img name 2' },
      ],
      data: { username: 'dasd', time: new Date().toString(), number: '1337' },
    },
    {
      id: '1',
      title: 'a 2nd thread',
      board: 'a',
      text: 'sample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread description',
      attachments: [{ link: 'url/322', name: 'sample img name 2' }],
      data: { username: 'dasd', time: new Date().toString(), number: '1337' },
    },
    {
      id: '2',
      title: 'b 1st thread',
      board: 'b',
      text: 'sample thread description',
      attachments: [],
      data: { username: 'dasd', time: new Date().toString(), number: '1337' },
    },
    {
      id: '3',
      title: 'b 2nd thread',
      board: 'b',
      text: 'sample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread description',
      attachments: [{ link: 'url/1337', name: 'sample img name' }],
      data: { username: 'dasd', time: new Date().toString(), number: '1337' },
    },
    {
      id: '4',
      title: 'a 3rd thread',
      board: 'a',
      text: 'sample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread description',
      attachments: [],
      data: { username: 'dasd', time: new Date().toString(), number: '1337' },
    },
    {
      id: '5',
      title: 'b 3rd thread',
      board: 'b',
      text: 'sample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread description',
      attachments: [
        { link: 'url/1337', name: 'sample img name' },
        { link: 'url/322', name: 'sample img name 2' },
      ],
      data: { username: 'dasd', time: new Date().toString(), number: '1337' },
    },
    {
      id: '6',
      title: 'vg 1st thread',
      board: 'vg',
      text: 'sample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread description',
      attachments: [
        { link: 'url/1337', name: 'sample img name' },
        { link: 'url/322', name: 'sample img name 2' },
      ],
      data: { username: 'dasd', time: new Date().toString(), number: '1337' },
    },
    {
      id: '7',
      title: 'mus 1nd thread',
      board: 'mus',
      text: 'sample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread description',
      attachments: [{ link: 'url/1337', name: 'sample img name' }],
      data: { username: 'dasd', time: new Date().toString(), number: '1337' },
    },
    {
      id: '8',
      title: 'mus 2nd thread',
      board: 'mus',
      text: 'sample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread descriptionsample thread description',
      attachments: [{ link: 'url/322', name: 'sample img name 2' }],
      data: { username: 'dasd', time: new Date().toString(), number: '1337' },
    },
  ];

  return threads;
}

export function getOneThread(id: string): Thread {
  const threads = getThreads();
  return threads.find(thread => thread.id === id);
}

export function getThreadsByBoard(boardId: string): Thread[] {
  const title = getOneBoard(boardId)?.title;
  const threads = getThreads();
  return threads.filter(thread => thread.board === title);
}
