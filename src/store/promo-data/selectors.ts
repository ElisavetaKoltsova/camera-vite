import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getPromos = (state: Pick<State, NameSpace.Promo>) =>
  state[NameSpace.Promo].promos;

export const getCouponDiscount = (state: Pick<State, NameSpace.Promo>) =>
  state[NameSpace.Promo].couponDiscount;
export const getCoupon = (state: Pick<State, NameSpace.Promo>) =>
  state[NameSpace.Promo].coupon;

export const getCouponDiscountDataLoadingStatus = (state: Pick<State, NameSpace.Promo>) =>
  state[NameSpace.Promo].isCouponDiscountDataLoading;
export const getPromoDataLoadingStatus = (state: Pick<State, NameSpace.Promo>) =>
  state[NameSpace.Promo].isPromoDataLoading;
