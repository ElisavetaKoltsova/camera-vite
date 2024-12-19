import { CouponName } from '../../const';
import { makeFakePromos } from '../../utils/mock';
import { fetchPromosAction, postCouponAction } from '../api-action';
import { promoData, resetCoupon } from './promo-data';

describe('PromoData Slice', () => {
  const COUNT_OF_PROMOS = 10;
  const COUPON_DISCOUNT = 0;

  const initialState = {
    promos: [],
    couponDiscount: COUPON_DISCOUNT,
    isCouponDiscountDataLoading: false,
    coupon: 'camera-333',
    isPromoDataLoading: false
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      promos: makeFakePromos(COUNT_OF_PROMOS),
      couponDiscount: COUPON_DISCOUNT,
      isCouponDiscountDataLoading: false,
      coupon: null,
      isPromoDataLoading: false
    };

    const result = promoData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      promos: [],
      couponDiscount: COUPON_DISCOUNT,
      isCouponDiscountDataLoading: false,
      coupon: null,
      isPromoDataLoading: false
    };

    const result = promoData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isCouponDiscountDataLoading" to "true" with "postCouponAction.pending"', () => {
    const expectedState = {
      promos: [],
      couponDiscount: COUPON_DISCOUNT,
      isCouponDiscountDataLoading: true,
      coupon: null,
      isPromoDataLoading: false
    };

    const result = promoData.reducer(undefined, postCouponAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "couponDiscount" to couponDiscount, "isCouponDiscountDataLoading" to "true" with "postCouponAction.fulfilled"', () => {
    const discount = 15;
    const expectedState = {
      promos: [],
      couponDiscount: discount,
      isCouponDiscountDataLoading: false,
      coupon: CouponName.Coupon333,
      isPromoDataLoading: false
    };

    const result = promoData.reducer(undefined, postCouponAction.fulfilled({
      data: discount,
      coupon: CouponName.Coupon333
    }, '', {coupon: CouponName.Coupon333}));

    expect(result).toEqual(expectedState);
  });

  it('should set "couponDiscount" to "0", "isCouponDiscountDataLoading" to "false" with "postCouponAction.rejected"', () => {
    const expectedState = {
      promos: [],
      couponDiscount: COUPON_DISCOUNT,
      isCouponDiscountDataLoading: false,
      coupon: null,
      isPromoDataLoading: false
    };

    const result = promoData.reducer(undefined, postCouponAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "isCouponDiscountDataLoading" to "true" with "fetchPromosAction.pending"', () => {
    const expectedState = {
      promos: [],
      couponDiscount: COUPON_DISCOUNT,
      isCouponDiscountDataLoading: false,
      coupon: null,
      isPromoDataLoading: true
    };

    const result = promoData.reducer(undefined, fetchPromosAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "promos" to array with promos with "fetchPromosAction.fulfilled"', () => {
    const mockPromos = makeFakePromos(COUNT_OF_PROMOS);
    const expectedState = {
      promos: [...mockPromos],
      couponDiscount: COUPON_DISCOUNT,
      isCouponDiscountDataLoading: false,
      coupon: null,
      isPromoDataLoading: false
    };

    const result = promoData.reducer(undefined, fetchPromosAction.fulfilled(mockPromos, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should reset coupon by "resetCoupon"', () => {
    const expectedState = {
      promos: [],
      couponDiscount: COUPON_DISCOUNT,
      isCouponDiscountDataLoading: false,
      coupon: null,
      isPromoDataLoading: false
    };

    const result = promoData.reducer(
      initialState,
      resetCoupon()
    );

    expect(result).toEqual(expectedState);
  });
});
