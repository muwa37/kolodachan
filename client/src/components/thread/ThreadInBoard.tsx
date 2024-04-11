import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getOffsetCommentsOfThread } from '../../API/comments';
import { getOneThread } from '../../API/threads';
import HideIcon from '../../assets/images/icons/hide.svg';
import { ThreadBody } from './ThreadBody';
import { ThreadCommentsList } from './ThreadCommentsList';
import { ThreadHeader } from './ThreadHeader';

interface ThreadInBoardProps {
  id: string;
}

export const ThreadInBoard: FC<ThreadInBoardProps> = ({ id }) => {
  const { title, text, attachments, data } = getOneThread(id);
  const offsetComments = getOffsetCommentsOfThread(id);
  const { pathname } = useLocation();

  return (
    <div className='flex flex-col items-start justify-center bg-slate-300 mt-2 px-2 py-1 w-[1270px] rounded-md'>
      <div className='flex justify-center items-center'>
        <Link
          to={pathname + '/threads/' + id}
          className='border-2 border-teal-800 rounded-md p-1'
        >
          go to thread
        </Link>
        <button className='size-4 ml-3 mx-2'>
          <HideIcon />
        </button>
        <ThreadHeader data={data} id={id} />
      </div>
      <ThreadBody title={title} text={text} attachments={attachments} />
      <ThreadCommentsList comments={offsetComments} />
    </div>
  );
};
