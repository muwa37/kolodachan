import React from 'react';
import { getThreadByBoard } from '../../API/threads';

export const BoardThreadsList = ({ boardId }) => {
  const threads = getThreadByBoard(boardId);

  return (
    <div>
      <div>
        board navigation:
        <div>search</div>
        <div>sort</div>
        <div>switch view</div>
      </div>
      <div>
        threads list
        {threads.map(thread => (
          <div key={thread.id}>
            <h1>{thread.title}</h1>
            <p>{thread.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
