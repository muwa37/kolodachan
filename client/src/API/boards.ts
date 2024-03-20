type Board = {
  title: string;
  id: string;
  description: string;
  info: string;
  img: string;
};

export function getBoards() {
  const boards: Board[] = [
    {
      title: 'a',
      id: '0',
      description: 'sample board description',
      info: 'link na info doski',
      img: '',
    },
    {
      title: 'b',
      id: '1',
      description: 'sample board description',
      info: 'link na info doski',
      img: '',
    },
    {
      title: 'vg',
      id: '2',
      description: 'sample board description',
      info: 'link na info doski',
      img: '',
    },
    {
      title: 'dev',
      id: '3',
      description: 'sample board description',
      info: 'link na info doski',
      img: '',
    },
    {
      title: 'd',
      id: '4',
      description: 'sample board description',
      info: 'link na info doski',
      img: '',
    },
    {
      title: 'mus',
      id: '5',
      description: 'sample board description',
      info: 'link na info doski',
      img: '',
    },
    {
      title: 'soc',
      id: '6',
      description: 'sample board description',
      info: 'link na info doski',
      img: '',
    },
    {
      title: 'his',
      id: '7',
      description: 'sample board description',
      info: 'link na info doski',
      img: '',
    },
    {
      title: 'cul',
      id: '8',
      description: 'sample board description',
      info: 'link na info doski',
      img: '',
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
