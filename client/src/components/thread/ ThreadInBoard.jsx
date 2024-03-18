import React from 'react';
import { getOffsetCommentsOfThread } from '../../API/comments';
import { getOneThread } from '../../API/threads';
import { ThreadBody } from './ThreadBody';
import { ThreadCommentsList } from './ThreadCommentsList';
import { ThreadHeader } from './ThreadHeader';

export const ThreadInBoard = ({ id }) => {
  const { title, text, attachments, data } = getOneThread(id);
  const offsetComments = getOffsetCommentsOfThread(id);

  return (
    <div className='flex flex-col items-start justify-center bg-slate-300 mt-2 px-2 py-1 w-[1270px] rounded-md'>
      <ThreadHeader data={data} />
      <ThreadBody title={title} text={text} attachments={attachments} />
      <ThreadCommentsList comments={offsetComments} />
    </div>
  );
};
