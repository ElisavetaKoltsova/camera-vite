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
      if (state.camerasInBasket.some((camera) => camera.id === action.payload.id)) {
        const seekedCamera = state.camerasInBasket.find((camera) => camera.id === action.payload.id);

        if (seekedCamera) {
          const indexOfCamera = state.camerasInBasket.indexOf(seekedCamera);

          if (state.camerasInBasket[indexOfCamera].countInBasket) {
            ++state.camerasInBasket[indexOfCamera].countInBasket;
          }
        }
      } else {
        state.camerasInBasket.push(action.payload);
      }
    },
    removeCameraInBasket(state, action: PayloadAction<number>) {
      state.camerasInBasket = state.camerasInBasket.filter((camera) => camera.id !== action.payload);
    },
    clearBasket(state) {
      state.camerasInBasket = [];
    },
    increaseCountOfCamerasInBasket(state, action: PayloadAction<number>) {
      const seekedCamera = state.camerasInBasket.find((camera) => camera.id === action.payload);

      if (seekedCamera) {
        const indexOfCamera = state.camerasInBasket.indexOf(seekedCamera);

        if (state.camerasInBasket[indexOfCamera].countInBasket) {
          ++state.camerasInBasket[indexOfCamera].countInBasket;
        }
      }
    },
    decreaseCountOfCamerasInBasket(state, action: PayloadAction<number>) {
      const seekedCamera = state.camerasInBasket.find((camera) => camera.id === action.payload);

      if (seekedCamera) {
        const indexOfCamera = state.camerasInBasket.indexOf(seekedCamera);

        if (state.camerasInBasket[indexOfCamera].countInBasket) {
          --state.camerasInBasket[indexOfCamera].countInBasket;
        }
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasDataLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.cameras.forEach((camera) => {
          camera.countInBasket = 1;
        });

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

export const {
  addCameraToBasket,
  removeCameraInBasket,
  clearBasket,
  increaseCountOfCamerasInBasket,
  decreaseCountOfCamerasInBasket
} = productData.actions;
