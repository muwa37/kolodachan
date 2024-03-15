import { About } from '../pages/About';
import { Board } from '../pages/Board';
import { BoardsList } from '../pages/BoardsList';
import { Thread } from '../pages/Thread';
import { ThreadsList } from '../pages/ThreadsList';

const routes = [
  { path: '/about', element: <About /> },
  { path: '/boards/:boardId', loader: '', element: <Board /> },
  { path: '/boards', element: <BoardsList /> },
  { path: '/boards/:boardId/threads', loader: '', element: <ThreadsList /> },
  {
    path: '/boards/:boardId/threads/:threadId',
    loader: '',
    element: <Thread />,
  },
];

export default routes;
