import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import Navbar from './components/wrapper/Navbar';
import Footer from './components/wrapper/Footer';

function App() {
  return ( 
    <BrowserRouter>
      <Navbar/>
        <AppRouter/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
