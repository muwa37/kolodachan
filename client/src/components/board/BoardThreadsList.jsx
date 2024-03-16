import React from 'react';
import { getThreadsByBoard } from '../../API/threads';
import { ThreadInBoard } from '../thread/ ThreadInBoard';

export const BoardThreadsList = ({ boardId }) => {
  const threads = getThreadsByBoard(boardId);

  return (
    <div className='h-full p-2 w-full'>
      <div>
        {threads.map(thread => (
          <ThreadInBoard key={thread.id} id={thread.id} />
        ))}
      </div>
    </div>
  );
};
