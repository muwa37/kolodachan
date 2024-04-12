import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userSubscriptionsSlice from './userSubscriptions/slice';

export const store = configureStore({
  reducer: { userSubscriptions: userSubscriptionsSlice },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
