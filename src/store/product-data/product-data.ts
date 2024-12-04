import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductData } from '../../types/state';
import { CameraCategory, CameraLevel, CameraType, LocalStorageName, NameSpace, PRICE_FROM, PRICE_TO, Sorts } from '../../const';
import { fetchCamerasAction, fetchCurrentCameraAction, fetchSimilarCamerasAction } from '../api-action';
import { Camera } from '../../types/camera';
import { sort } from '../../utils/sort';
import { applyFilters, changeFiltersByPrice, filterPrice } from '../../utils/filter';
import { findMaximalPrice, findMinimalPrice } from '../../utils/list';

const initialState: ProductData = {
  cameras: [],
  filteredCameras: [],
  currentCamera: null,
  similarCameras: [],
  camerasInBasket: [],
  isCamerasDataLoading: false,
  sort: Sorts.PRICE_LOW_TO_HIGH,
  priceFrom: PRICE_FROM,
  priceTo: PRICE_TO,
  filterOfCategory: null,
  filterOfTypes: [],
  filterOfLevels: []
};

const changeAndApplyFilters = (state: ProductData) => {
  state.filteredCameras = applyFilters(
    state.cameras,
    state.filterOfCategory,
    state.filterOfTypes,
    state.filterOfLevels,
  );

  state.priceFrom = findMinimalPrice(state.cameras);
  state.priceTo = findMaximalPrice(state.cameras);

  const { filteredCameras, priceFrom, priceTo } = changeFiltersByPrice(state.filteredCameras, state.priceFrom, state.priceTo);
  state.filteredCameras = filteredCameras;
  state.priceFrom = priceFrom;
  state.priceTo = priceTo;
};

export const productData = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    sortCameras(state, action: PayloadAction<string>) {
      if (state.filteredCameras.length) {
        state.filteredCameras = sort[action.payload]([...state.filteredCameras]);
        state.sort = action.payload;
      } else {
        state.cameras = sort[action.payload]([...state.cameras]);
        state.sort = action.payload;
      }
    },
    filterCamerasPrice(state, action: PayloadAction<{priceFrom: number; priceTo: number}>) {
      state.priceFrom = action.payload.priceFrom;
      state.priceTo = action.payload.priceTo;

      state.filteredCameras = applyFilters(
        state.cameras,
        state.filterOfCategory,
        state.filterOfTypes,
        state.filterOfLevels,
      );

      state.filteredCameras = filterPrice(state.filteredCameras, state.priceFrom, state.priceTo);
    },
    filterCamerasCategory(state, action: PayloadAction<CameraCategory | null>) {
      state.filterOfCategory = action.payload;
      changeAndApplyFilters(state);
    },
    filterCamerasType(state, action: PayloadAction<CameraType[]>) {
      state.filterOfTypes = action.payload;
      changeAndApplyFilters(state);
    },
    filterCamerasLevel(state, action: PayloadAction<CameraLevel[]>) {
      state.filterOfLevels = action.payload;
      changeAndApplyFilters(state);
    },
    resetFilters(state) {
      state.filteredCameras = [];

      state.filterOfCategory = null;
      state.filterOfLevels = [];
      state.filterOfTypes = [];

      state.priceFrom = findMinimalPrice(state.cameras);
      state.priceTo = findMaximalPrice(state.cameras);
    },
    setCamerasInBasket(state, action: PayloadAction<Camera[]>) {
      state.camerasInBasket = action.payload;
    },
    addCameraToBasket(state, action: PayloadAction<Camera>) {
      state.camerasInBasket.push(action.payload);
      localStorage.setItem(LocalStorageName.CamerasInBasket, JSON.stringify(state.camerasInBasket));
    },
    removeCameraInBasket(state, action: PayloadAction<{id: number; parameter?: string}>) {
      const { id, parameter } = action.payload;
      if (parameter) {
        const cameraForDelete = state.camerasInBasket.find((camera) => camera.id === id);
        if (cameraForDelete) {
          const indexOfCamera = state.camerasInBasket.indexOf(cameraForDelete);
          if (indexOfCamera >= 0) {
            state.camerasInBasket.splice(indexOfCamera, 1);
          }
        }
      } else {
        state.camerasInBasket = state.camerasInBasket.filter((camera) => camera.id !== id);
      }
      localStorage.setItem(LocalStorageName.CamerasInBasket, JSON.stringify(state.camerasInBasket));
    },
    clearBasket(state) {
      state.camerasInBasket = [];
      localStorage.setItem(LocalStorageName.CamerasInBasket, JSON.stringify(state.camerasInBasket));
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasDataLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = sort[state.sort]([...action.payload]);

        state.priceFrom = findMinimalPrice(state.cameras);
        state.priceTo = findMaximalPrice(state.cameras);

        state.cameras.forEach((camera) => {
          camera.countInBasket = 0;
        });

        if (state.filterOfCategory || state.filterOfTypes.length || state.filterOfLevels.length) {
          changeAndApplyFilters(state);
        }

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
  setCamerasInBasket,
  addCameraToBasket,
  removeCameraInBasket,
  clearBasket,
  sortCameras,
  filterCamerasCategory,
  filterCamerasLevel,
  filterCamerasPrice,
  filterCamerasType,
  resetFilters
} = productData.actions;
