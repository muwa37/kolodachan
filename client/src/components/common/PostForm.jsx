import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

export const PostForm = ({ parentId }) => {
  const [isOpened, setIsOpened] = useState(false);
  const fileInputId = useId();

  console.log(parentId);

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
    <div className='py-2 w-full flex justify-center'>
      {isOpened ? (
        <div className='flex flex-col items-center justify-start w-2/3'>
          <button
            className='text-2xl font-semibold border-2 border-teal-800 rounded-md p-2 w-56'
            onClick={toggleIsOpened}
          >
            hide post form
          </button>
          <form className='w-full' onSubmit={handleSubmit(onSubmitHandler)}>
            <div className='flex w-full'>
              <div className='m-1 w-2/3'>
                <input
                  className='w-full p-2 border-solid border border-teal-800 rounded-md'
                  placeholder='thread title'
                  {...register('threadTitle', { required: true })}
                />
                {errors.threadTitle && <span>thread title is required</span>}
              </div>
              <div className='m-1 w-1/3'>
                <input
                  className='w-full p-2 border-solid border border-teal-800 rounded-md'
                  placeholder='user name'
                  {...register('userName')}
                />
              </div>
            </div>
            <div className='m-1'>
              <textarea
                rows={10}
                cols={40}
                className='w-full min-h-40 p-2 border-solid border border-teal-800 rounded-md'
                placeholder='thread text, maximum length is 8000 chars'
                {...register('threadText', { required: true })}
                maxLength={8000}
              />
              {errors.threadText && <span>thread text is required</span>}
            </div>
            <div className='m-1 flex justify-center items-center '>
              <label
                className='w-full h-20 p-2 border-dotted border-2 border-teal-800 text-lg font-light italic rounded-md flex items-center justify-center'
                htmlFor={fileInputId}
              >
                file input
                <input
                  type='file'
                  className='hidden'
                  id={fileInputId}
                  {...register('threadAttachments')}
                />
              </label>
            </div>
            <div className='w-full flex justify-evenly items-center '>
              <div className='m-1 p-2 w-2/3 border border-solid border-teal-800 rounded-md'>
                <img src='asd.asd' alt='captcha' />
              </div>
              <input
                className='p-2 w-1/3 m-1 border-solid border border-teal-800 rounded-md'
                placeholder='captcha'
                {...register('captcha', { required: true })}
              />
              {errors.captcha && <span>captcha is required</span>}
            </div>
            <button className='m-1 w-28 flex justify-center items-center border-2 border-teal-800 rounded-md p-1 '>
              send
            </button>
          </form>
        </div>
      ) : (
        <button
          className='text-2xl font-semibold border-2 border-teal-800 rounded-md p-2 w-56'
          onClick={toggleIsOpened}
        >
          open post form
        </button>
      )}
    </div>
  );
};
