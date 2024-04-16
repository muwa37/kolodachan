import { UserSubscriptionsSliceState } from '@/types/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserSubscriptionsSliceState = {
  favoriteThreads: [],
  userComments: [],
  userThreads: [],
  isSubscribedToOwnComments: true,
  isSubscribedToOwnThreads: true,
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
      state.userThreads.push(action.payload);
    },
    deleteFavoriteThread(state, action: PayloadAction<string>) {
      state.favoriteThreads.filter(threadId => threadId !== action.payload);
    },
    subscribeToOwnComments(state) {
      state.isSubscribedToOwnComments = true;
    },
    unsubscribeToOwnComments(state) {
      state.isSubscribedToOwnComments = false;
    },
    subscribeToOwnThreads(state) {
      state.isSubscribedToOwnThreads = true;
    },
    unsubscribeToOwnThreads(state) {
      state.isSubscribedToOwnThreads = false;
    },
  },
});

export default userSubscriptionsSlice.reducer;

export const {
  addFavoriteThread,
  addUserComment,
  addUserThreadSubscription,
  subscribeToOwnComments,
  unsubscribeToOwnComments,
  subscribeToOwnThreads,
  unsubscribeToOwnThreads,
  deleteFavoriteThread,
} = userSubscriptionsSlice.actions;
