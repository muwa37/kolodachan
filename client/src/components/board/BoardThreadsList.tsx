import { FC } from 'react';
import { getThreadsByBoard } from '../../API/threads';
import { PostForm } from '../common/PostForm';
import { ThreadInBoard } from '../thread/ThreadInBoard';

interface BoardThreadsListProps {
  boardId: string;
}

export const BoardThreadsList: FC<BoardThreadsListProps> = ({ boardId }) => {
  const threads = getThreadsByBoard(boardId);

  return (
    <div className='h-full p-2 w-full'>
      <div>
        {threads.map(thread => (
          <ThreadInBoard key={thread.id} id={thread.id} />
        ))}
      </div>

      <PostForm parentId={boardId} />
    </div>
  );
};
