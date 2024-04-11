import FavoriteIcon from '../../assets/images/icons/favorite.svg';
import ReportIcon from '../../assets/images/icons/report.svg';

export const ThreadMenu = () => {
  return (
    <div className='flex items-center justify-start'>
      <button className='size-4 m-2'>
        <ReportIcon />
      </button>
      <button className='size-4 m-2'>
        <FavoriteIcon />
      </button>
    </div>
  );
};
