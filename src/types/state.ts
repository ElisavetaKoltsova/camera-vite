import { store } from '../store';
import { Camera } from './camera';
import { Review } from './review';

export type ProductData = {
  cameras: Camera[];
  currentCamera: Camera | null;
  isCamerasDataLoading: boolean;
};

export type ReviewData = {
  reviews: Review[];
  isReviewsDataLoading: boolean;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;