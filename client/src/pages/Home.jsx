import React from 'react';
import kolodaHomeImg from '../assets/images/static/koloda-home.png';

export const Home = () => {
  return (
    <section className='flex w-full h-full items-center justify-evenly'>
      <div className='h-5/6 flex flex-col justify-evenly items-center'>
        <h1 className='text-6xl'>kolodaChan</h1>
        <div>
          <h2 className='text-2xl'>welcome, nya^^</h2>
          <p>kolodaChan - borda dlya kavainih lydey</p>
        </div>
      </div>
      <div className='flex justify-center items-center w-1/2 h-full'>
        <img
          className='w-5/6 saturate-50 opacity-75 drop-shadow-2xl blur-[0.5px]'
          src={kolodaHomeImg}
          alt='koloda-homepage'
        />
      </div>
    </section>
  );
};
