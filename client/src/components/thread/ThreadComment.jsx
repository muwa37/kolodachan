import React from 'react';
import { PostData } from '../common/PostData';
import { ReplyButton } from '../common/ReplyButton';

export const ThreadComment = () => {
  return (
    <div className='mt-2 w-full bg-slate-400 p-1 rounded-md'>
      <div className='flex'>
        <ReplyButton />
        <PostData />
      </div>
      <div className='flex items-start justify-start'>
        <div className='p-2'>comment attachments</div>
        <div>comment text</div>
      </div>
    </div>
  );
};
