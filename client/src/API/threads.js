export function getThreads() {
  const threads = [
    {
      id: '0',
      title: 'a 1st thread',
      board: 'a',
      description: 'sample thread description',
    },
    {
      id: '1',
      title: 'a 2nd thread',
      board: 'a',
      description: 'sample thread description',
    },
    {
      id: '2',
      title: 'b 1st thread',
      board: 'b',
      description: 'sample thread description',
    },
    {
      id: '3',
      title: 'b 2nd thread',
      board: 'b',
      description: 'sample thread description',
    },
    {
      id: '4',
      title: 'a 3rd thread',
      board: 'a',
      description: 'sample thread description',
    },
    {
      id: '5',
      title: 'b 3rd thread',
      board: 'b',
      description: 'sample thread description',
    },
    {
      id: '6',
      title: 'vg 1st thread',
      board: 'vg',
      description: 'sample thread description',
    },
    {
      id: '7',
      title: 'mus 1nd thread',
      board: 'mus',
      description: 'sample thread description',
    },
    {
      id: '8',
      title: 'mus 2nd thread',
      board: 'mus',
      description: 'sample thread description',
    },
  ];

  return threads;
}

export function getOneThread(id) {
  const threads = getThreads();
  return threads.find(thread => thread.id === id);
}
