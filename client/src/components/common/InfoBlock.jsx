import React from 'react';

export const InfoBlock = ({ title, info }) => {
  return (
    <div className='w-full flex flex-col items-center justify-start'>
      <h2 className='text-2xl font-semibold'>{title}</h2>
      <div className='underline underline-offset-2 flex flex-col justify-start items-start w-2/3'>
        <ul>
          {info.map((item, ind) => (
            <li key={ind}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
