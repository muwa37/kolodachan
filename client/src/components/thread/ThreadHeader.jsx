import React from 'react';
import { PostData } from '../common/PostData';
import { ReplyButton } from '../common/ReplyButton';
import { ThreadMenu } from './ThreadMenu';

export const ThreadHeader = () => {
  return (
    <div className='flex'>
      <ReplyButton />
      <ThreadMenu />
      <PostData />
    </div>
  );
};
