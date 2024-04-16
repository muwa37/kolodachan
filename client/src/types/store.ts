import { Board } from '.';

export type UserSubscriptionsSliceState = {
  favoriteThreads: string[];
  userComments: string[];
  userThreadSubscriptions: string[];
};

export type BoardSliceState = {
  board: Board | null;
  loadingStatus: Status;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
