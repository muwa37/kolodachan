import { BoardResponse } from './api';

export type UserSubscriptionsSliceState = {
  favoriteThreads: string[];
  userComments: string[];
  userThreads: string[];
  isSubscribedToOwnComments: boolean;
  isSubscribedToOwnThreads: boolean;
};

export type BoardSliceState = {
  board: BoardResponse | null;
  loadingStatus: Status;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
