import { store } from '../store';
import { Camera } from './camera';

export type ProductData = {
  cameras: Camera[];
  isCamerasDataLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
