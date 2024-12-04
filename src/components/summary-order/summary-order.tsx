import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCouponAction } from '../../store/api-action';
import { getCouponDiscount, getCouponDiscountDataLoadingStatus } from '../../store/promo-data/selectors';
import { Camera } from '../../types/camera';
import { Coupon } from '../../types/promo';
import { calculateDiscount, convertNumberIntoMoneyFormat } from '../../utils/list';
import Loader from '../loader/loader';
import { CouponName } from '../../const';
import { useState } from 'react';
import { getOrderDataLoadingStatus } from '../../store/order-data/selectors';

type SummaryOrderProps = {
  camerasInBasket: Camera[];
  onOrderSuccessClick: (camerasToOrder: Camera[]) => void;
}

const SUCCESS_COUPON_MESSAGE_TIMEOUT = 2000;

export default function SummaryOrder({camerasInBasket, onOrderSuccessClick}: SummaryOrderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: {errors} } = useForm<Coupon>();
  const [couponSuccess, setCouponSuccess] = useState<boolean>(false);

  const couponDiscount = useAppSelector(getCouponDiscount);
  const isCouponDiscountDataLoading = useAppSelector(getCouponDiscountDataLoadingStatus);
  const isOrderDataLoading = useAppSelector(getOrderDataLoadingStatus);

  let summaryPrice = 0;

  camerasInBasket.forEach((camera) => {
    summaryPrice += camera.price;
  });

  const convertedPrice = convertNumberIntoMoneyFormat(summaryPrice);
  const priceWithDiscount = calculateDiscount(camerasInBasket, summaryPrice, couponDiscount);
  const convertedPriceWithDiscount = convertNumberIntoMoneyFormat(priceWithDiscount);
  const discount = convertNumberIntoMoneyFormat(summaryPrice - priceWithDiscount);

  const onSubmit: SubmitHandler<Coupon> = (data) => {
    dispatch(postCouponAction(data));
    setCouponSuccess(true);

    setTimeout(() => {
      setCouponSuccess(false);
    }, SUCCESS_COUPON_MESSAGE_TIMEOUT);
  };

  const checkCorrectnessOfCoupon = (value: string) => Object.values(CouponName).includes(value as CouponName);

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title&#45;&#45;h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit)}
          >
            <div
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              className={`custom-input ${errors.coupon && 'is-invalid'} ${couponSuccess && 'is-valid'}`}
            >
              <label><span className="custom-input__label">Промокод</span>
                <input
                  type="text"
                  placeholder="Введите промокод"
                  {...register('coupon', {
                    required: false,
                    validate: checkCorrectnessOfCoupon
                  })}
                />
              </label>
              {errors.coupon && <p className="custom-input__error">Промокод неверный</p>}
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button className="btn" type="submit">Применить
            </button>
          </form>
        </div>
      </div>
      {
        isCouponDiscountDataLoading || isOrderDataLoading
          ?
          <Loader />
          :
          <div className="basket__summary-order">
            <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{convertedPrice} ₽</span></p>
            <p className="basket__summary-item">
              <span className="basket__summary-text">
                Скидка:
              </span>
              <span className={`basket__summary-value ${summaryPrice - priceWithDiscount > 0 ? 'basket__summary-value--bonus' : ''}`}>
                {discount} ₽
              </span>
            </p>
            <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{convertedPriceWithDiscount} ₽</span></p>
            <button
              className="btn btn--purple"
              type="submit"
              onClick={() => onOrderSuccessClick(camerasInBasket)}
              disabled={!camerasInBasket.length}
            >
              Оформить заказ
            </button>
          </div>
      }
    </div>
  );
}
