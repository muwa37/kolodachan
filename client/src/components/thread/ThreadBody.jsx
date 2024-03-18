import React from 'react';

export const ThreadBody = ({ title, text, attachments }) => {
  return (
    <div className='w-full flexitems-start justify-start'>
      <h3 className='text-2xl font-semibold'>{title}</h3>
      <div className='flex'></div>
      {attachments.map(item => (
        <div className='p-2'>thread attachments</div>
      ))}

      <p>{text}</p>
    </div>
  );
};
