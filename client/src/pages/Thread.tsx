import { Link, useParams } from 'react-router-dom';

import { selectBoard } from '@/store/board/selectors';
import { useSelector } from 'react-redux';
import { getCommentsByThread } from '../api/comments';
import { getOneThread } from '../api/threads';
import { BoardHeader } from '../components/board/BoardHeader';
import { PostForm } from '../components/common/PostForm';
import { ThreadBody } from '../components/thread/ThreadBody';
import { ThreadCommentsList } from '../components/thread/ThreadCommentsList';
import { ThreadHeader } from '../components/thread/ThreadHeader';

export const Thread = () => {
  const { threadId, boardId } = useParams();
  const { data, id, title, text, attachments } = getOneThread(threadId);
  const {
    title: boardTitle,
    description,
    image,
  } = useSelector(selectBoard).board;
  const comments = getCommentsByThread(threadId);

  return (
    <div>
      <BoardHeader
        title={boardTitle}
        description={description}
        info={'info.html'}
        image={image}
      />
      <PostForm parentId={id} />
      <div className='flex flex-col items-start justify-center bg-slate-300 mt-2 px-2 py-1 w-[1270px] rounded-md'>
        <div className='flex justify-center items-center'>
          <Link
            to={'/boards/' + boardTitle}
            className='border-2 border-teal-800 rounded-md p-1'
          >
            back to board
          </Link>
          <ThreadHeader data={data} id={id} />
        </div>
        <ThreadBody title={title} text={text} attachments={attachments} />
        <ThreadCommentsList comments={comments} />
      </div>
      <PostForm parentId={id} />
    </div>
  );
};
