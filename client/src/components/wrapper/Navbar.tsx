import { NavLink } from 'react-router-dom';
import kolodaNavLogo from '../../assets/images/static/koloda-nav-icon.png';

export const Navbar = () => {
  return (
    <header className='p-2 flex items-center'>
      <nav className='w-full h-full flex space-x-6 items-center justify-between'>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'text-sky-600' : '')}
          end
        >
          <div className='flex h-full items-center justify-center'>
            <div className='flex justify-center items-center w-1/2 h-full'>
              <img
                className='h-10 saturate-50 opacity-75 drop-shadow-2xl '
                src={kolodaNavLogo}
                alt='koloda-nav-logo'
              />
            </div>
            <h4 className='text-xl font-semibold'>kolodaChan</h4>
          </div>
        </NavLink>
        <nav className='w-1/4 flex items-center justify-evenly'>
          <NavLink
            to='/boards'
            className={({ isActive }) => (isActive ? 'text-sky-600' : '')}
            end
          >
            boards
          </NavLink>
          <NavLink
            to='/threads'
            className={({ isActive }) => (isActive ? 'text-sky-600' : '')}
          >
            threads
          </NavLink>
          <NavLink
            to='/about'
            className={({ isActive }) => (isActive ? 'text-sky-600' : '')}
          >
            about
          </NavLink>
          <NavLink
            to='/rules'
            className={({ isActive }) => (isActive ? 'text-sky-600' : '')}
          >
            rules
          </NavLink>
        </nav>
      </nav>
    </header>
  );
};
