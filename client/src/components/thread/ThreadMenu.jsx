import React from 'react';

import favoriteIcon from '../../assets/images/icons/favorite.svg';
import reportIcon from '../../assets/images/icons/report.svg';

export const ThreadMenu = () => {
  return (
    <div className='flex items-center justify-start'>
      <button className='size-4 m-2'>
        <img src={reportIcon} alt='report' />
      </button>
      <button className='size-4 m-2'>
        <img src={favoriteIcon} alt='add to favorite' />
      </button>
    </div>
  );
};
