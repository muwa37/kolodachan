import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

export const PostForm = ({ parentId }) => {
  const [isOpened, setIsOpened] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = data => {
    console.log(data);
  };

  const toggleIsOpened = () => {
    setIsOpened(!isOpened);
  };
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className='h-fit py-2 flex flex-col items-center justify-evenly'>
      {isOpened ? (
        <div>
          <button onClick={toggleIsOpened}>hide post form</button>
          <div>
            post form of:
            {parentId}
          </div>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className='m-1'>
              <input
                placeholder='thread title'
                {...register('threadTitle', { required: true })}
              />
              {errors.threadTitle && <span>thread title is required</span>}
            </div>
            <div className='m-1'>
              <input
                placeholder='user name, Anon - default'
                value={'Anon'}
                {...register('userName', { required: true })}
              />
              {errors.userName && <span>user name is required</span>}
            </div>
            <div className='m-1'>
              <input
                placeholder='thread text'
                {...register('threadText', { required: true })}
              />
              {errors.threadText && <span>thread text is required</span>}
            </div>
            <div className='m-1'>
              <input
                placeholder='thread attachments'
                {...register('threadAttachments')}
              />
            </div>
            <div className='m-1'>
              <input
                placeholder='captcha'
                {...register('captcha', { required: true })}
              />
              {errors.captcha && <span>captcha is required</span>}
            </div>
            <button>send</button>
          </form>
        </div>
      ) : (
        <button onClick={toggleIsOpened}>open post form</button>
      )}
    </div>
  );
};
