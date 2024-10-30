import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductData } from '../../types/state';
import { NameSpace, Sorts } from '../../const';
import { fetchCamerasAction, fetchCurrentCameraAction, fetchSimilarCamerasAction } from '../api-action';
import { Camera } from '../../types/camera';
import { sort } from '../../utils/sort';

const initialState: ProductData = {
  cameras: [],
  currentCamera: null,
  similarCameras: [],
  camerasInBasket: [],
  isCamerasDataLoading: false,
  sort: Sorts.PRICE_LOW_TO_HIGH
};

export const productData = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    sortCameras(state, action: PayloadAction<string>) {
      state.cameras = sort[action.payload]([...state.cameras]);
      state.sort = action.payload;
    },
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
        state.cameras = sort[state.sort]([...action.payload]);
        state.cameras.forEach((camera) => {
          camera.countInBasket = 0;
        });

        state.isCamerasDataLoading = false;
      })
      .addCase(fetchCurrentCameraAction.pending, (state) => {
        state.isCamerasDataLoading = true;
      })
      .addCase(fetchCurrentCameraAction.fulfilled, (state, action) => {
        state.currentCamera = action.payload;
        state.isCamerasDataLoading = false;
      })
      .addCase(fetchSimilarCamerasAction.pending, (state) => {
        state.isCamerasDataLoading = true;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
        state.isCamerasDataLoading = false;
      });
  }
});

export const {
  addCameraToBasket,
  removeCameraInBasket,
  clearBasket,
  increaseCountOfCamerasInBasket,
  decreaseCountOfCamerasInBasket,
  sortCameras
} = productData.actions;
