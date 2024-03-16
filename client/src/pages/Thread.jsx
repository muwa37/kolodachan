import { useParams } from 'react-router-dom';

import { getOneBoard } from '../API/boards';
import { getCommentsByThread } from '../API/comments';
import { getOneThread } from '../API/threads';
import { BoardHeader } from '../components/board/BoardHeader';
import { PostForm } from '../components/common/PostForm';
import { ThreadBody } from '../components/thread/ThreadBody';
import { ThreadCommentsList } from '../components/thread/ThreadCommentsList';
import { ThreadHeader } from '../components/thread/ThreadHeader';

export const Thread = () => {
  const { threadId, boardId } = useParams();
  const thread = getOneThread(threadId);
  const { title, description, info, img } = getOneBoard(boardId);
  const comments = getCommentsByThread(threadId);

  return (
    <div>
      <BoardHeader
        title={title}
        description={description}
        info={info}
        img={img}
      />
      <PostForm parentId={thread.id} />
      <ThreadHeader />
      <ThreadBody />
      <ThreadCommentsList comments={comments} />
    </div>
  );
};
