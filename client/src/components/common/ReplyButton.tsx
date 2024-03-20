import React from 'react';

import replyIcon from '../../assets/images/icons/reply.svg';

export const ReplyButton = () => {
  return (
    <button className='size-4 m-2'>
      <img src={replyIcon} alt='reply' />
    </button>
  );
};
