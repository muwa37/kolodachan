import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/wrapper/Footer';
import { Navbar } from '../components/wrapper/Navbar';

export const Main = () => {
  return (
    <div className='h-screen w-screen flex flex-col justify-between text-teal-800 bg-slate-200'>
      <Navbar />
      <div className='overflow-auto py-2 h-[90%] border-y-2 border-teal-800'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
