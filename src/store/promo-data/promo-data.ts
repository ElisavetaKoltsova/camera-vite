import { createSlice } from '@reduxjs/toolkit';
import { PromoData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchPromosAction, postCouponAction } from '../api-action';

const initialState: PromoData = {
  promos: [],
  couponDiscount: 0,
  isCouponDiscountDataLoading: false
};

export const promoData = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromosAction.fulfilled, (state, action) => {
        state.promos = action.payload;
      })
      .addCase(postCouponAction.pending, (state) => {
        state.isCouponDiscountDataLoading = true;
      })
      .addCase(postCouponAction.fulfilled, (state, action) => {
        state.couponDiscount = action.payload;
        state.isCouponDiscountDataLoading = false;
      })
      .addCase(postCouponAction.rejected, (state) => {
        state.couponDiscount = 0;
        state.isCouponDiscountDataLoading = false;
      });
  }
});
