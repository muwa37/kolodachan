import React from 'react';
import { ThreadComment } from './ThreadComment';

export const ThreadCommentsList = ({ comments }) => {
  return (
    <div className='w-full my-1'>
      {comments.map(comment => (
        <ThreadComment
          key={comment.id}
          text={comment.text}
          attachments={comment.attachments}
          data={comment.data}
        />
      ))}
    </div>
  );
};
