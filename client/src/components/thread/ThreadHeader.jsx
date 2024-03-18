import React from 'react';

import { PostData } from '../common/PostData';
import { ReplyButton } from '../common/ReplyButton';
import { ThreadMenu } from './ThreadMenu';

export const ThreadHeader = ({ data, id }) => {
  return (
    <div className='flex items-center justify-center py-2 '>
      <ReplyButton />
      <ThreadMenu />
      <PostData data={data} />
    </div>
  );
};
