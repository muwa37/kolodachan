import React, { useState } from 'react';

export const PostForm = ({ parentId }) => {
  const [isOpened, setIsOpened] = useState(false);
  const toggleIsOpened = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className='h-fit py-2 flex flex-col items-center justify-evenly'>
      {isOpened ? (
        <div>
          <button onClick={toggleIsOpened}>hide post form</button>
          <div>
            post form of:
            {parentId}
          </div>
        </div>
      ) : (
        <button onClick={toggleIsOpened}>open post form</button>
      )}
    </div>
  );
};
