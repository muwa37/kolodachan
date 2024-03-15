export function getThreads() {
  const threads = [
    {
      id: 1,
      title: 'a 1st thread',
      board: 'a',
    },
    {
      id: 2,
      title: 'a 2nd thread',
      board: 'a',
    },
    {
      id: 3,
      title: 'b 1st thread',
      board: 'b',
    },
    {
      id: 4,
      title: 'b 2nd thread',
      board: 'b',
    },
  ];

  return threads;
}

export function getOneThread(id) {
  const threads = getThreads();
  return threads.find(thread => thread.id === id);
}
