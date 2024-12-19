import { createSlice } from '@reduxjs/toolkit';
import { PromoData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchPromosAction, postCouponAction } from '../api-action';

const initialState: PromoData = {
  promos: [],
  couponDiscount: 0,
  isCouponDiscountDataLoading: false,
  isPromoDataLoading: false,
  coupon: null
};

export const promoData = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {
    resetCoupon(state) {
      state.coupon = null;
      state.couponDiscount = 0;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPromosAction.pending, (state) => {
        state.isPromoDataLoading = true;
      })
      .addCase(fetchPromosAction.fulfilled, (state, action) => {
        state.isPromoDataLoading = false;
        state.promos = action.payload;
      })
      .addCase(postCouponAction.pending, (state) => {
        state.isCouponDiscountDataLoading = true;
      })
      .addCase(postCouponAction.fulfilled, (state, action) => {
        const { data, coupon } = action.payload;
        state.couponDiscount = data;
        state.coupon = coupon;
        state.isCouponDiscountDataLoading = false;
      })
      .addCase(postCouponAction.rejected, (state) => {
        state.couponDiscount = 0;
        state.isCouponDiscountDataLoading = false;
      });
  }
});

export const { resetCoupon } = promoData.actions;
