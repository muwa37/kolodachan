import AboutPage from '../pages/AboutPage';
import BoardPage from '../pages/BoardPage';
import BoardsListPage from '../pages/BoardsListPage';

const routes = [
    {path: '/about', element: <AboutPage/>},
    {path: '/boards/:boardId', loader:'', element: <BoardPage/>},
    {path: '/boards', element: <BoardsListPage/>}
];

export default routes;