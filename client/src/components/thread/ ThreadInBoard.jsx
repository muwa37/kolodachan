import React from 'react';
import { getOffsetCommentsOfThread } from '../../API/comments';
import { getOneThread } from '../../API/threads';
import { ThreadBody } from './ThreadBody';
import { ThreadCommentsList } from './ThreadCommentsList';
import { ThreadMenu } from './ThreadMenu';

export const ThreadInBoard = ({ id }) => {
  const thread = getOneThread(id);
  const offsetComments = getOffsetCommentsOfThread(id);

  return (
    <div className='flex flex-col items-start justify-center bg-slate-300 mt-2 px-2 py-1 w-[1270px] rounded-md'>
      <ThreadMenu />
      <ThreadBody />
      <ThreadCommentsList comments={offsetComments} />
    </div>
  );
};
