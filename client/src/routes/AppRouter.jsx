import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
  } from "react-router-dom";
import routes from './routes';
import Root from './Root'
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';

export const AppRouter = createBrowserRouter (createRoutesFromElements (
        <Route
            path='/'
            element={<Root/>}
            errorElement={<ErrorPage/>}
        >
            <Route 
                index 
                element={<HomePage/>} 
            />
            <Route
                errorElement={<ErrorPage/>}
            />
            {routes.map( route => 
                <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                    errorElement={<ErrorPage/>}
                />
            )}
        </Route>
));