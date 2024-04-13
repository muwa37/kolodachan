import { Route } from 'react-router-dom';
import { UnexpectedError } from '../components/common/UnexpectedError';
import { Main } from '../layouts/Main';
import { About } from '../pages/About';
import { Board } from '../pages/Board';
import { BoardsList } from '../pages/BoardsList';
import { Error } from '../pages/Error';
import { Home } from '../pages/Home';
import { Rules } from '../pages/Rules';
import { Thread } from '../pages/Thread';
import { ThreadsList } from '../pages/ThreadsList';

//TODO: refactor router

export const routes = [
  { path: '/about', element: <About /> },
  { path: '/rules', element: <Rules /> },
  { path: '/boards', element: <BoardsList /> },
  { path: '/boards/:boardId', loader: '', element: <Board /> },
  { path: '/boards/:boardId/threads', loader: '', element: <ThreadsList /> },
  {
    path: '/boards/:boardId/threads/:threadId',
    loader: '',
    element: <Thread />,
  },
  { path: '/threads', loader: '', element: <ThreadsList /> },
];

export const AppRoutes = () => {
  return (
    <Route path='/' element={<Main />} errorElement={<Error />}>
      <Route index element={<Home />} />
      {routes.map(route => (
        <Route
          path={route.path}
          element={route.element}
          key={route.path}
          errorElement={<UnexpectedError />}
        />
      ))}
    </Route>
  );
};
