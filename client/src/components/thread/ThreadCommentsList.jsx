import React from 'react';
import { ThreadComment } from './ThreadComment';

export const ThreadCommentsList = ({ comments }) => {
  console.log(comments);
  return (
    <div className='w-full my-1'>
      {comments.map(comment => (
        <ThreadComment key={comment.id} />
      ))}
    </div>
  );
};
