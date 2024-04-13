import { RootState } from '..';

export const selectUserSubscriptions = (state: RootState) =>
  state.userSubscriptions;
