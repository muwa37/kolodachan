import { FC, useState } from 'react';

import SearchIcon from '@/assets/images/icons/search.svg';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { sortOrders, sortTypes } from '@/utils/consts';

type BoardNavProps = {
  view: string;
  toggleView: () => void;
  sort: { type: string; order: string };
  changeSort: (newSort: { type: string; order: string }) => void;
};

export const BoardNav: FC<BoardNavProps> = ({
  view,
  toggleView,
  sort,
  changeSort,
}) => {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [isSortActive, setIsSortActive] = useState<boolean>(false);
  const [newSort, setNewSort] = useState(sort);

  const toggleSearch = () => {
    setIsSearchActive(prev => !prev);
  };
  const toggleSort = () => {
    setIsSortActive(prev => !prev);
  };
  const changeNewSort = (changedSort: { type: string; order: string }) => {
    setNewSort(changedSort);
  };

  const outsideRef = useOutsideClick(() => {
    setIsSortActive(false);
  });

  return (
    <div className='w-full p-2 flex items-center justify-start h-16'>
      <div className='h-full'>
        <button onClick={toggleSearch} className='size-4 m-2'>
          <SearchIcon />
        </button>

        {isSearchActive && (
          <input className='rounded-sm h-full px-2 ' placeholder='search' />
        )}
      </div>
      <div className='relative mx-6 w-52'>
        sort by:
        <button
          onClick={toggleSort}
          className='pl-1 underline decoration-dashed text-sky-600'
        >
          {sort.type + ` (${sort.order})`}
        </button>
        {isSortActive && (
          <div
            ref={outsideRef}
            className='rounded-md absolute w-full flex flex-col items-center justify-between bg-slate-100'
          >
            <div className='w-full flex items-start justify-evenly p-2'>
              <ul>
                {sortTypes.map(sortType => (
                  <li>
                    <button
                      className={
                        newSort.type === sortType
                          ? 'underline decoration-dashed text-sky-600'
                          : ''
                      }
                      onClick={() =>
                        changeNewSort({ type: sortType, order: newSort.order })
                      }
                    >
                      {sortType}
                    </button>
                  </li>
                ))}
              </ul>
              <ul>
                {sortOrders.map(sortOrder => (
                  <li>
                    <button
                      className={
                        newSort.order === sortOrder
                          ? 'underline decoration-dashed text-sky-600'
                          : ''
                      }
                      onClick={() =>
                        changeNewSort({ type: newSort.type, order: sortOrder })
                      }
                    >
                      {sortOrder}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className='border-2 border-teal-800 rounded-md p-1'
              onClick={() => {
                changeSort(newSort);
                setIsSortActive(false);
              }}
            >
              set sort
            </button>
          </div>
        )}
      </div>
      <div className='pl-2'>
        switch view to
        <button
          className='pl-1 underline decoration-dashed text-sky-600'
          onClick={toggleView}
        >
          {view === 'scroll' ? 'catalog' : 'scroll'}
        </button>
      </div>
    </div>
  );
};
