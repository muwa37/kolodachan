import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Card = ({ title, description, image, id }) => {
  const { pathname } = useLocation();

  return (
    <Link to={pathname + '/' + title}>
      <div className='h-full flex items-center justify-evenly border-solid border-2 border-teal-800 rounded-lg'>
        <div className='w-1/2'>
          <img className='p-2' src={image} alt={title + 'logo'} />
        </div>
        <div className='w-1/2 -p2 flex flex-col items-center justify-between'>
          <h2 className='underline underline-offset-2 font-semibold'>
            {title}
          </h2>
          <p className='text-center'>{description}</p>
        </div>
      </div>
    </Link>
  );
};
