import { createAsyncThunk } from '@reduxjs/toolkit';
import { Camera } from '../types/camera';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';

export const APIAction = {
  FETCH_CAMERAS: 'cameras/getCameras'
};

//   FETCH_QUESTS: 'quests/getQuests',
//   FETCH_CURRENT_QUEST: 'quests/getCurrentQuest',
//   FETCH_BOOKING_QUEST: 'quests/getBookingQuest',
//   FETCH_RESERVATION_QUESTS: 'quests/getReservationQuests',
//   POST_RESERVE_QUEST: 'quest/postReserveQuest',
//   DELETE_RESERVE_QUEST: 'quest/deleteReserveQuest',
//   CHECK_AUTH: 'user/checkAuth',
//   LOGIN: 'user/login',
//   LOGOUT: 'user/logout'

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
