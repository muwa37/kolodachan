import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/wrapper/Footer';
import Navbar from '../components/wrapper/Navbar';

const Root = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
