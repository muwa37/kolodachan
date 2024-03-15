import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/wrapper/Footer';
import Navbar from '../components/wrapper/Navbar';

export const Main = () => {
  return (
    <div className='container mx-0 py-4 px-2 h-screen flex flex-col justify-between text-teal-800 bg-slate-400'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
