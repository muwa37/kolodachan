import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='flex items-center'>
      <nav className='w-full flex space-x-6 ml-8 items-center justify-between'>
        <Link to='/'>kolodaChan</Link>
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
