import { createAsyncThunk } from '@reduxjs/toolkit';
import { Camera } from '../types/camera';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { Review } from '../types/review';
import { Coupon, Promo } from '../types/promo';

export const APIAction = {
  FETCH_CAMERAS: 'cameras/getCameras',
  FETCH_CURRENT_CAMERA: 'cameras/getCurrentCamera',
  FETCH_REVIEWS: 'cameras/getReviews',
  FETCH_PROMO: 'cameras/getPromo',
  POST_COUPON: 'cameras/postCoupon'
};

export const fetchCamerasAction = createAsyncThunk<Camera[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_CAMERAS,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Camera[]>(APIRoute.Cameras);
    return data;
  }
);

export const fetchCurrentCameraAction = createAsyncThunk<Camera, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_CURRENT_CAMERA,
  async (id, {extra: api}) => {
    const { data } = await api.get<Camera>(`${APIRoute.Cameras}/${id}`);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_REVIEWS,
  async (id, {extra: api}) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Cameras}/${id}${APIRoute.Reviews}`);
    return data;
  }
);

export const fetchPromosAction = createAsyncThunk<Promo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.FETCH_PROMO,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Promo[]>(APIRoute.Promo);
    return data;
  }
);

export const postCouponAction = createAsyncThunk<number, Coupon, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIAction.POST_COUPON,
  async ({coupon}, {extra: api}) => {
    const { data } = await api.post<number>(APIRoute.Coupon, {coupon});
    return data;
  }
);
