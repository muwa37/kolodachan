import { useParams } from 'react-router-dom';

import { getOneBoard } from '../API/boards';
import { getOneThread } from '../API/threads';
import { BoardHeader } from '../components/board/BoardHeader';
import { PostForm } from '../components/common/PostForm';
import { ThreadBody } from '../components/thread/ThreadBody';
import { ThreadCommentsList } from '../components/thread/ThreadCommentsList';

export const Thread = () => {
  const { threadId, boardId } = useParams();
  const thread = getOneThread(threadId);
  const { title, description, info, img } = getOneBoard(boardId);

  return (
    <div>
      thread page
      <div>title: {thread.title}</div>
      <BoardHeader
        title={title}
        description={description}
        info={info}
        img={img}
      />
      <PostForm parentId={thread.id} />
      <ThreadBody />
      <ThreadCommentsList />
    </div>
  );
};
