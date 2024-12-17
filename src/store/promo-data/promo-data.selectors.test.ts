import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { makeFakePromos } from '../../utils/mock';
import { getCoupon, getCouponDiscount, getCouponDiscountDataLoadingStatus, getPromoDataLoadingStatus, getPromos } from './selectors';

describe('PromoData selectors', () => {
  const COUNT_OF_PROMOS = 10;
  const COUPON_DISCOUNT = 0;

  const state: Pick<State, NameSpace.Promo> = {
    [NameSpace.Promo]: {
      promos: makeFakePromos(COUNT_OF_PROMOS),
      couponDiscount: COUPON_DISCOUNT,
      isCouponDiscountDataLoading: false,
      coupon: null,
      isPromoDataLoading: false
    }
  };

  it('should return promos from state', () => {
    const { promos } = state[NameSpace.Promo];
    const result = getPromos(state);

    expect(result).toBe(promos);
  });

  it('should return couponDiscount from state', () => {
    const { couponDiscount } = state[NameSpace.Promo];
    const result = getCouponDiscount(state);

    expect(result).toBe(couponDiscount);
  });

  it('should return coupon from state', () => {
    const { coupon } = state[NameSpace.Promo];
    const result = getCoupon(state);

    expect(result).toBe(coupon);
  });

  it('should return isCouponDiscountDataLoading from state', () => {
    const { isCouponDiscountDataLoading } = state[NameSpace.Promo];
    const result = getCouponDiscountDataLoadingStatus(state);

    expect(result).toBe(isCouponDiscountDataLoading);
  });

  it('should return isPromoDataLoading from state', () => {
    const { isPromoDataLoading } = state[NameSpace.Promo];
    const result = getPromoDataLoadingStatus(state);

    expect(result).toBe(isPromoDataLoading);
  });
});
