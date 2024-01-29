import AboutPage from '../pages/AboutPage';
import BoardPage from '../pages/BoardPage';
import BoardsListPage from '../pages/BoardsListPage';
import ThreadPage from '../pages/ThreadPage';

const routes = [
    {path: '/about', element: <AboutPage/>},
    {path: '/boards/:boardId', loader:'', element: <BoardPage/>},
    {path: '/boards', element: <BoardsListPage/>},
    {path: '/boards/:boardId/:threadId', loader:'', element: <ThreadPage/>}
];

export default routes;