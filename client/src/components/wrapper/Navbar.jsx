import React from 'react';
import { Link } from 'react-router-dom';
import kolodaNavLogo from '../../assets/images/static/koloda-nav-icon.png';

const Navbar = () => {
  return (
    <header className='flex items-center'>
      <nav className='w-full h-full flex space-x-6 items-center justify-between'>
        <Link to='/'>
          <div className='flex h-full items-center justify-center'>
            <div className='flex justify-center items-center w-1/2 h-full'>
              <img
                className='h-10 saturate-50 opacity-75 drop-shadow-2xl '
                src={kolodaNavLogo}
                alt='koloda-nav-logo'
              />
            </div>
            <h1>kolodaChan</h1>
          </div>
        </Link>
        <nav className='w-1/4 flex items-center justify-evenly'>
          <Link to='/boards'>boards</Link>
          <Link to='/threads'>threads</Link>
          <Link to='/about'>about</Link>
          <Link to='/rules'>rules</Link>
        </nav>
      </nav>
    </header>
  );
};

export default Navbar;
