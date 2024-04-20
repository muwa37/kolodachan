import ReactDOM from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';
import { AppRouter } from './routes/AppRouter';
import { store } from './store';

const rootElem = document.getElementById('root');
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  root.render(
    <Provider store={store}>
      <RouterProvider router={AppRouter} />
    </Provider>
  );
}
