import React, { useState } from 'react';

import searchIcon from '../../assets/images/icons/search.svg';

export const BoardNav = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  return (
    <div className='w-full p-2 flex items-center justify-start'>
      <div>
        <button onClick={toggleSearch} className='size-4 m-2'>
          <img src={searchIcon} alt='search' />
        </button>
        {isSearchActive && <input placeholder='search' />}
      </div>
      <div className='mx-2'>sort by...</div>
      <div>switch view</div>
    </div>
  );
};
