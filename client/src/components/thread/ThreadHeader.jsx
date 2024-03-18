import React from 'react';
import { PostData } from '../common/PostData';
import { ReplyButton } from '../common/ReplyButton';
import { ThreadMenu } from './ThreadMenu';

export const ThreadHeader = () => {
  return (
    <div className='flex items-center justify-center'>
      <ReplyButton />
      <ThreadMenu />
      <PostData />
    </div>
  );
};
