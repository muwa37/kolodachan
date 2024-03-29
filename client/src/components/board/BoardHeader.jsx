import { Link, useLocation } from 'react-router-dom';

export const BoardHeader = ({ title, description, img, info }) => {
  const { pathname } = useLocation();

  return (
    <div className='w-full flex flex-col items-center h-fit py-2 justify-evenly border-b-2 border-teal-800'>
      <div>
        <img src={img} alt={title + '-logo'} />
      </div>
      <div className='flex flex-col items-center justify-evenly'>
        <h1 className='text-6xl font-extrabold'>{title}</h1>
        <div className='text-2xl font-semibold italic'>{description}</div>
        <Link
          to={pathname + '/rules'}
          className='underline underline-offset-2 font-semibold text-sky-600 '
        >
          {info}
        </Link>
      </div>
    </div>
  );
};
