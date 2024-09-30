import { createSlice } from '@reduxjs/toolkit';
import { PromoData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchPromosAction } from '../api-action';

const initialState: PromoData = {
  promos: []
};

export const promoData = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromosAction.fulfilled, (state, action) => {
        state.promos = action.payload;
      });
  }
});
