import { BrowserRouter } from 'react-router-dom';
import Footer from './components/wrapper/Footer';
import Navbar from './components/wrapper/Navbar';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
