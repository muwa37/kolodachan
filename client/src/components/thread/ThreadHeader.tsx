import { FC } from 'react';

import { PostData } from '../common/PostData';
import { ReplyButton } from '../common/ReplyButton';
import { ThreadMenu } from './ThreadMenu';

interface ThreadHeaderProps {
  data: any;
  id: string;
}

export const ThreadHeader: FC<ThreadHeaderProps> = ({ data, id }) => {
  return (
    <div className='flex items-center justify-center py-2 '>
      <ReplyButton />
      <ThreadMenu />
      <PostData data={data} />
    </div>
  );
};
