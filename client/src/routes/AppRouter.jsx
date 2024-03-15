import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Main } from '../layouts/Main';
import { Error } from '../pages/Error';
import { Home } from '../pages/Home';
import routes from './routes';

export const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Main />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route errorElement={<Error />} />
      {routes.map(route => (
        <Route
          path={route.path}
          element={route.element}
          key={route.path}
          errorElement={<Error />}
        />
      ))}
    </Route>
  )
);
