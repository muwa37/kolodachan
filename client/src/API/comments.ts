const comments = [
  {
    id: '1',
    text: 'a 1st thread 1st replay sample text',
    thread: '1',
    attachments: [{ link: 'url/1337', name: 'sample img name' }],
    data: { username: 'dasd', time: new Date().toString(), number: '1337' },
  },
  {
    id: '2',
    text: 'a 2nd thread 1st replay sample text',
    thread: '2',
    attachments: [
      { link: 'url/1337', name: 'sample img name' },
      { link: 'url/322', name: 'sample img name 2' },
    ],
    data: { username: 'dasd', time: new Date().toString(), number: '1337' },
  },
  {
    id: '3',
    text: 'b 1st thread 1st replay sample text',
    thread: '3',
    attachments: [{ link: 'url/1337', name: 'sample img name' }],
    data: { username: 'dasd', time: new Date().toString(), number: '1337' },
  },
  {
    id: '4',
    text: 'b 2nd thread 1st replay sample text',
    thread: '4',
    attachments: [
      { link: 'url/1337', name: 'sample img name' },
      { link: 'url/322', name: 'sample img name 2' },
    ],
    data: { username: 'dasd', time: new Date().toString(), number: '1337' },
  },
  {
    id: '5',
    text: 'a 1st thread 2nd replay sample text',
    thread: '1',
    attachments: [],
    data: { username: 'dasd', time: new Date().toString(), number: '1337' },
  },
  {
    id: '6',
    text: 'a 2nd thread 2nd replay sample text',
    thread: '2',
    attachments: [
      { link: 'url/1337', name: 'sample img name' },
      { link: 'url/322', name: 'sample img name 2' },
    ],
    data: { username: 'dasd', time: new Date().toString(), number: '1337' },
  },
  {
    id: '7',
    text: 'b 1st thread 2nd replay sample text',
    thread: '3',
    attachments: [],
    data: { username: 'dasd', time: new Date().toString(), number: '1337' },
  },
  {
    id: '8',
    text: 'b 2nd thread 2nd replay sample text',
    thread: '4',
    attachments: [
      { link: 'url/1337', name: 'sample img name' },
      { link: 'url/322', name: 'sample img name 2' },
    ],
    data: { username: 'dasd', time: new Date().toString(), number: '1337' },
  },
];

const offset = 3;

export function getCommentsByThread(threadId: string) {
  return comments.filter(comment => comment.thread === threadId);
}

export function getOffsetCommentsOfThread(threadId: string) {
  return comments
    .filter(comment => comment.thread === threadId)
    .slice(0, offset - 1);
}
