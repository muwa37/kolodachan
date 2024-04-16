import HideIcon from '@/assets/images/icons/hide.svg';
import ShowIcon from '@/assets/images/icons/show.svg';
import { useAppDispatch } from '@/store';
import { selectUserSubscriptions } from '@/store/userSubscriptions/selectors';
import {
  subscribeToOwnComments,
  subscribeToOwnThreads,
  unsubscribeToOwnComments,
  unsubscribeToOwnThreads,
} from '@/store/userSubscriptions/slice';
import { categories } from '@/utils/consts';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const UserSubscriptionPanel = () => {
  const [active, setActive] = useState<boolean>(false);
  const [category, setCategory] = useState('favorites');
  const [isCategoriesActive, setIsCategoriesActive] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const userSubscriptions = useSelector(selectUserSubscriptions);

  const {
    isSubscribedToOwnComments,
    isSubscribedToOwnThreads,
    favoriteThreads,
  } = userSubscriptions;

  const toggleUserSubscriptionPanel = () => {
    setActive(prev => !prev);
  };
  const showCategories = () => {
    setIsCategoriesActive(prev => !prev);
  };
  const onCategoryChange = () => {
    setCategory(category === 'favorites' ? 'popular' : 'favorites');
    setIsCategoriesActive(prev => !prev);
  };
  const toggleSubscriptionToOwnComments = () => {
    dispatch(
      isSubscribedToOwnComments
        ? unsubscribeToOwnComments()
        : subscribeToOwnComments()
    );
  };
  const toggleSubscriptionToOwnThreads = () => {
    dispatch(
      isSubscribedToOwnThreads
        ? unsubscribeToOwnThreads()
        : subscribeToOwnThreads()
    );
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
                  <div onClick={toggleSubscriptionToOwnThreads}>
                    <input type='checkbox' checked={isSubscribedToOwnThreads} />
                    <span>subscribe to your threads</span>
                  </div>
                  <div onClick={toggleSubscriptionToOwnComments}>
                    <input
                      type='checkbox'
                      checked={isSubscribedToOwnComments}
                    />
                    <span>subscribe to your comments</span>
                  </div>
                  <ul>
                    {favoriteThreads.map(thread => (
                      <li>{thread}</li>
                    ))}
                  </ul>
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
