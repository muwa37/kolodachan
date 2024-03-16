export function getBoards() {
  const boards = [
    {
      title: 'a',
      id: '0',
      description: 'sample board description',
      info: 'link na info doski',
    },
    {
      title: 'b',
      id: '1',
      description: 'sample board description',
      info: 'link na info doski',
    },
    {
      title: 'vg',
      id: '2',
      description: 'sample board description',
      info: 'link na info doski',
    },
    {
      title: 'dev',
      id: '3',
      description: 'sample board description',
      info: 'link na info doski',
    },
    {
      title: 'd',
      id: '4',
      description: 'sample board description',
      info: 'link na info doski',
    },
    {
      title: 'mus',
      id: '5',
      description: 'sample board description',
      info: 'link na info doski',
    },
    {
      title: 'soc',
      id: '6',
      description: 'sample board description',
      info: 'link na info doski',
    },
    {
      title: 'his',
      id: '7',
      description: 'sample board description',
      info: 'link na info doski',
    },
    {
      title: 'cul',
      id: '8',
      description: 'sample board description',
      info: 'link na info doski',
    },
  ];

  return boards;
}

export function getOneBoard(id) {
  const boards = getBoards();
  return boards.find(board => board.title === id);
}
