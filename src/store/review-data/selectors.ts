import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getReviews = (state: Pick<State, NameSpace.Review>) =>
  state[NameSpace.Review].reviews;

export const getReviewsDataLoadingStatus = (state: Pick<State, NameSpace.Review>) =>
  state[NameSpace.Review].isReviewsDataLoading;
