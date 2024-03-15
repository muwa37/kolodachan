export function getBoards() {
  const boards = [
    {
      title: 'a',
      id: '0',
      description: 'sample board description',
    },
    {
      title: 'b',
      id: '1',
      description: 'sample board description',
    },
    {
      title: 'vg',
      id: '2',
      description: 'sample board description',
    },
    {
      title: 'dev',
      id: '3',
      description: 'sample board description',
    },
    {
      title: 'd',
      id: '4',
      description: 'sample board description',
    },
    {
      title: 'mus',
      id: '5',
      description: 'sample board description',
    },
    {
      title: 'soc',
      id: '6',
      description: 'sample board description',
    },
    {
      title: 'his',
      id: '7',
      description: 'sample board description',
    },
    {
      title: 'cul',
      id: '8',
      description: 'sample board description',
    },
  ];

  return boards;
}

export function getOneBoard(id) {
  const boards = getBoards();
  return boards.find(board => board.title === id);
}
