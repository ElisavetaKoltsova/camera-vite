import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OrderData } from '../../types/state';
import { postOrderAction } from '../api-action';

const initialState: OrderData = {
  isOrderDataLoading: false
};

export const orderData = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postOrderAction.pending, (state) => {
        state.isOrderDataLoading = true;
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.isOrderDataLoading = false;
      });
  }
});
