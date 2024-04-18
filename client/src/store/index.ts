import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import boardSlice from './board/slice';
import userSubscriptionsSlice from './userSubscriptions/slice';

export const store = configureStore({
  reducer: { userSubscriptions: userSubscriptionsSlice, board: boardSlice },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
