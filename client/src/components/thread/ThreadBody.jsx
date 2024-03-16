import React from 'react';

export const ThreadBody = () => {
  return (
    <div className='w-full flex items-start justify-start'>
      <div className='p-2'>thread attachments</div>
      <div className='w-full flex flex-col items-start justify-start'>
        <h3 className='text-2xl font-semibold'>thread title</h3>
        <p>thread text</p>
      </div>
    </div>
  );
};
