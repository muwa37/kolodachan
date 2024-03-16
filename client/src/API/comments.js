const comments = [
  {
    id: '1',
    text: 'a 1st thread 1st replay sample text',
    thread: '1',
  },
  {
    id: '2',
    title: 'a 2nd thread 1st replay sample text',
    thread: '2',
  },
  {
    id: '3',
    title: 'b 1st thread 1st replay sample text',
    thread: '3',
  },
  {
    id: '4',
    title: 'b 2nd thread 1st replay sample text',
    thread: '4',
  },
  {
    id: '5',
    text: 'a 1st thread 2nd replay sample text',
    thread: '1',
  },
  {
    id: '6',
    title: 'a 2nd thread 2nd replay sample text',
    thread: '2',
  },
  {
    id: '7',
    title: 'b 1st thread 2nd replay sample text',
    thread: '3',
  },
  {
    id: '8',
    title: 'b 2nd thread 2nd replay sample text',
    thread: '4',
  },
];

const offset = 3;

export function getCommentsByThread(threadId) {
  return comments.filter(comment => comment.thread === threadId);
}

export function getOffsetCommentsOfThread(threadId) {
  return comments
    .filter(comment => comment.thread === threadId)
    .slice(0, offset - 1);
}
