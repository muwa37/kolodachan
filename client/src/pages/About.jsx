import React from 'react';
import { getAbout } from '../API/info';
import { InfoBlock } from '../components/common/InfoBlock';

export const About = () => {
  const about = getAbout();

  return (
    <section className='flex flex-col w-full h-full items-center justify-evenly'>
      <h1 className='text-6xl font-extrabold'>about kolodaChan</h1>
      <div className='h-full w-full flex flex-col items-start justify-start'>
        {about.map(item => (
          <InfoBlock key={item.id} title={item.title} info={item.info} />
        ))}
      </div>
    </section>
  );
};
