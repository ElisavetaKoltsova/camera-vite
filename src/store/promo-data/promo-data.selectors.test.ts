import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { makeFakePromos } from '../../utils/mock';
import { getCouponDiscount, getCouponDiscountDataLoadingStatus, getPromos } from './selectors';

describe('PromoData selectors', () => {
  const COUNT_OF_PROMOS = 10;
  const COUPON_DISCOUNT = 0;

  const state: Pick<State, NameSpace.Promo> = {
    [NameSpace.Promo]: {
      promos: makeFakePromos(COUNT_OF_PROMOS),
      couponDiscount: COUPON_DISCOUNT,
      isCouponDiscountDataLoading: false
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

  it('should return isCouponDiscountDataLoading from state', () => {
    const { isCouponDiscountDataLoading } = state[NameSpace.Promo];
    const result = getCouponDiscountDataLoadingStatus(state);

    expect(result).toBe(isCouponDiscountDataLoading);
  });
});
