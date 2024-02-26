export function getBoards() {
  const boards = [
    {
      title: 'a',
      id: 'a',
    },
    {
      title: 'b',
      id: 'b',
    },
  ];

  return boards;
}

export function getOneBoard(id) {
  const boards = getBoards();
  return boards.find(board => board.id === id);
}
