import ReactDOM from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';

import { AppRouter } from './routes/AppRouter';

const rootElem = document.getElementById('root');
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  root.render(<RouterProvider router={AppRouter} />);
}
