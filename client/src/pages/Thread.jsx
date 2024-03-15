import { useParams } from 'react-router-dom';
import { getOneThread } from '../API/threads';
import BoardHeader from '../components/board/BoardHeader';
import ThreadBody from '../components/thread/ThreadBody';
import ThreadCommentsList from '../components/thread/ThreadCommentsList';

export const Thread = ({ ...props }) => {
  const params = useParams();
  const thread = getOneThread(Number(params.threadId));

  return (
    <div>
      thread page
      <div>url id: {params.threadId}</div>
      <div>title: {thread.title}</div>
      <BoardHeader />
      <ThreadBody />
      <ThreadCommentsList />
    </div>
  );
};
