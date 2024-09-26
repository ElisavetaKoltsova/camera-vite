import { createSlice } from '@reduxjs/toolkit';
import { ProductData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchCamerasAction } from '../api-action';

const initialState: ProductData = {
  cameras: [],
  isCamerasDataLoading: false
};

export const productData = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasDataLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isCamerasDataLoading = false;
      });
  }
});
