import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchCamerasAction, fetchCurrentCameraAction } from '../api-action';
import { Camera } from '../../types/camera';

const initialState: ProductData = {
  cameras: [],
  currentCamera: null,
  camerasInBasket: [],
  isCamerasDataLoading: false
};

export const productData = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    addCameraToBasket(state, action: PayloadAction<Camera>) {
      state.camerasInBasket.push(action.payload);
    },
    removeCameraInBasket(state, action: PayloadAction<number>) {
      state.camerasInBasket = state.camerasInBasket.filter((camera) => camera.id !== action.payload);
    },
    clearBasket(state) {
      state.camerasInBasket = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasDataLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isCamerasDataLoading = false;
      })
      .addCase(fetchCurrentCameraAction.pending, (state) => {
        state.isCamerasDataLoading = true;
      })
      .addCase(fetchCurrentCameraAction.fulfilled, (state, action) => {
        state.currentCamera = action.payload;
        state.isCamerasDataLoading = false;
      });
  }
});

export const { addCameraToBasket, removeCameraInBasket, clearBasket } = productData.actions;
