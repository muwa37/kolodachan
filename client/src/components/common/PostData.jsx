import React from 'react';

export const PostData = ({ data }) => {
  const { username, time, number } = data;
  return (
    <div className='text-sm font-light p-1'>
      <span className=' text-yellow-700'>{username}</span>
      <span className='mx-1'>{time}</span>
      <span>№{number}</span>
    </div>
  );
};
