import { FC } from 'react';
import { AttachmentsBlock } from '../common/AttachmentsBlock';

interface ThreadBodyProps {
  title: string;
  text: string;
  attachments: any;
}

export const ThreadBody: FC<ThreadBodyProps> = ({
  title,
  text,
  attachments,
}) => {
  return (
    <div className='w-full flexitems-start justify-start'>
      <h3 className='text-2xl font-semibold'>{title}</h3>
      <AttachmentsBlock attachments={attachments} />
      <p>{text}</p>
    </div>
  );
};
