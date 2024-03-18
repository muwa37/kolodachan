import React from 'react';

export const ThreadBody = ({ title, text, attachments }) => {
  return (
    <div className='w-full flexitems-start justify-start'>
      <h3 className='text-2xl font-semibold'>{title}</h3>
      <div className='flex'>
        {attachments.map(item => (
          <div className='p-2 flex flex-col justify-center items-center max-w-1/4'>
            <p>{item.name}</p>
            <img src={item.link} />
          </div>
        ))}
      </div>
      <p>{text}</p>
    </div>
  );
};
