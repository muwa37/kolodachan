import { Comment } from '@/types';
import { FC } from 'react';
import { ThreadComment } from './ThreadComment';

interface ThreadCommentsListProps {
  comments: Comment[];
}

export const ThreadCommentsList: FC<ThreadCommentsListProps> = ({
  comments,
}) => {
  return (
    <div className='w-full my-1'>
      {comments.map((comment: any) => (
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
