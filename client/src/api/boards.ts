import { Board } from '@/types';

export function getBoards() {
  const boards: Board[] = [
    {
      title: 'a',
      id: '0',
      description: 'sample board description',
      info: 'link na info doski',
      img: 'url/322',
    },
    {
      title: 'b',
      id: '1',
      description: 'sample board description',
      info: 'link na info doski',
      img: 'url/322',
    },
    {
      title: 'vg',
      id: '2',
      description: 'sample board description',
      info: 'link na info doski',
      img: 'url/322',
    },
    {
      title: 'dev',
      id: '3',
      description: 'sample board description',
      info: 'link na info doski',
      img: 'url/322',
    },
    {
      title: 'd',
      id: '4',
      description: 'sample board description',
      info: 'link na info doski',
      img: 'url/322',
    },
    {
      title: 'mus',
      id: '5',
      description: 'sample board description',
      info: 'link na info doski',
      img: 'url/322',
    },
    {
      title: 'soc',
      id: '6',
      description: 'sample board description',
      info: 'link na info doski',
      img: 'url/322',
    },
    {
      title: 'his',
      id: '7',
      description: 'sample board description',
      info: 'link na info doski',
      img: 'url/322',
    },
    {
      title: 'cul',
      id: '8',
      description: 'sample board description',
      info: 'link na info doski',
      img: 'url/322',
    },
  ];

  return boards;
}

export function getOneBoard(id: string): Board {
  const boards = getBoards();
  return (
    boards.find(board => board.title === id) || {
      title: '',
      id: '',
      description: '',
      info: '',
      img: '',
    }
  );
}
