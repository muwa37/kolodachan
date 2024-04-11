import { FC } from 'react';
import { AttachmentsBlock } from '../common/AttachmentsBlock';
import { PostData } from '../common/PostData';
import { ReplyButton } from '../common/ReplyButton';

interface ThreadCommentProps {
  text: string;
  data: string;
  attachments: any;
}

export const ThreadComment: FC<ThreadCommentProps> = ({
  text,
  attachments,
  data,
}) => {
  return (
    <div className='mt-2 w-full bg-slate-400 p-1 rounded-md'>
      <div className='flex items-center justify-start'>
        <ReplyButton />
        <PostData data={data} />
      </div>
      <AttachmentsBlock attachments={attachments} />
      <div>{text}t</div>
    </div>
  );
};
