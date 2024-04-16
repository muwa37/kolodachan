import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BoardHeaderProps {
  title: string;
  description: string;
  image: string;
  info: string;
}

export const BoardHeader: FC<BoardHeaderProps> = ({
  title,
  description,
  image,
  info,
}) => {
  const { pathname } = useLocation();

  return (
    <div className='w-full flex flex-col items-center h-fit py-2 justify-evenly border-b-2 border-teal-800'>
      <div>
        <img src={image} alt={title + '-logo'} />
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
