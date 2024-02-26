import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import Root from './Root';
import routes from './routes';

export const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route errorElement={<ErrorPage />} />
      {routes.map(route => (
        <Route
          path={route.path}
          element={route.element}
          key={route.path}
          errorElement={<ErrorPage />}
        />
      ))}
    </Route>
  )
);
