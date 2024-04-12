import { UserSubscriptionsSliceState } from '@/types/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserSubscriptionsSliceState = {
  favoriteThreads: [],
  userComments: [],
  userThreadSubscriptions: [],
};

const userSubscriptionsSlice = createSlice({
  name: 'userSubscriptions',
  initialState,
  reducers: {
    addFavoriteThread(state, action: PayloadAction<string>) {
      state.favoriteThreads.push(action.payload);
    },
    addUserComment(state, action: PayloadAction<string>) {
      state.userComments.push(action.payload);
    },
    addUserThreadSubscription(state, action: PayloadAction<string>) {
      state.userThreadSubscriptions.push(action.payload);
    },
  },
});

export default userSubscriptionsSlice.reducer;

export const { addFavoriteThread, addUserComment, addUserThreadSubscription } =
  userSubscriptionsSlice.actions;
