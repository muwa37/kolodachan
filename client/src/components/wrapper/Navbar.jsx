import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to='/'>kolodaChan</Link>
      <nav>
        <Link to='/boards'>all boards</Link>
        <Link to='/threads'>all threads</Link>
        <Link to='/about'>about</Link>
      </nav>
    </nav>
  );
};

export default Navbar;
