import HideIcon from '@/assets/images/icons/hide.svg';
import ShowIcon from '@/assets/images/icons/show.svg';
import { useState } from 'react';

const categories = ['favorites', 'popular'];

export const UserSubscriptionPanel = () => {
  const [active, setActive] = useState<boolean>(false);
  const [category, setCategory] = useState('favorites');
  const [isCategoriesActive, setIsCategoriesActive] = useState<boolean>(false);

  const toggleUserSubscriptionPanel = () => {
    setActive(prev => !prev);
  };
  const showCategories = () => {
    setIsCategoriesActive(prev => !prev);
  };
  const onCategoryChange = () => {
    setCategory(prev => (prev === 'favorites' ? 'popular' : 'favorites'));
    setIsCategoriesActive(prev => !prev);
  };

  return (
    <div className='fixed  bottom-1/4 right-4 h-1/2 flex justify-center items-center bg-slate-400 border-solid border-2 border-amber-700 rounded-lg'>
      {active ? (
        <div className='flex flex-col items-center '>
          <HideIcon onClick={toggleUserSubscriptionPanel} />
          <div className='p-2 flex justify-between'>
            {!isCategoriesActive ? (
              <button onClick={showCategories}>{category}</button>
            ) : (
              categories.map((category, ind) => (
                <button key={ind} className='p-2' onClick={onCategoryChange}>
                  {category}
                </button>
              ))
            )}
          </div>
          <div className='p-2 w-96 flex flex-col'>
            {category === 'favorites' ? (
              <div>
                <div>
                  <div>
                    <input type='checkbox' />
                    <span>show your treads updates</span>
                  </div>
                  <div>
                    <input type='checkbox' />
                    <span>show replies to your comments</span>
                  </div>
                  <div>sample favorite updates</div>
                </div>
              </div>
            ) : (
              <div>sample most popular threads</div>
            )}
          </div>
        </div>
      ) : (
        <div className='w-10 flex items-center justify-center'>
          <ShowIcon onClick={toggleUserSubscriptionPanel} />
        </div>
      )}
    </div>
  );
};
