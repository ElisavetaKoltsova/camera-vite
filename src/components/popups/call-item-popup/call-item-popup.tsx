import { useEffect } from 'react';
import { useScroll } from '../../../hooks/use-scroll';
import { Camera } from '../../../types/camera';
import BasketShortItem from '../../basket-short-item/basket-short-item';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Telephone } from '../../../types/telephone';
import { useHookFormMask } from 'use-mask-input';
import { useAppDispatch } from '../../../hooks';
import { postOrderAction } from '../../../store/api-action';
import { Order } from '../../../types/order';

type CallItemPopupProps = {
  selectedCamera: Camera | null;
  onCloseClick: () => void;
}

export default function CallItemPopup({selectedCamera, onCloseClick}: CallItemPopupProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { disableScroll, enableScroll } = useScroll();
  const { register, handleSubmit, formState: {errors} } = useForm<Telephone>();
  const registerWithMask = useHookFormMask(register);

  useEffect(() => {
    const handleEscKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseClick();
      }
    };

    document.addEventListener('keydown', handleEscKeyDown);

    disableScroll();
    return () => {
      enableScroll();
      document.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [disableScroll, enableScroll, onCloseClick]);

  const onSubmit: SubmitHandler<Telephone> = (data) => {
    if (selectedCamera) {
      const camerasIdsInOrder = [];
      camerasIdsInOrder.push(selectedCamera.id);

      const order: Order = {
        camerasIds: camerasIdsInOrder,
        coupon: null,
        tel: data.telephone
      };

      dispatch(postOrderAction(order));
    }

    onCloseClick();
  };

  const checkCorrectnessOfPhone = (value: string) => {
    const phoneReg = /[+]*[7-8]{1}\s?[(]*[1-9][0-9]{2}[)]*\s?\d{3}[-]*\d{2}[-]*\d{2}/;
    const isPhoneValid = phoneReg.test(value);

    return isPhoneValid ? isPhoneValid : 'Телефон введён неверно';
  };

  if (selectedCamera) {
    return (
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={onCloseClick}></div>
          <div className="modal__content">
            <p className="title title--h4">Свяжитесь со мной</p>
            <BasketShortItem selectedCamera={selectedCamera}/>
            <div
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              className={`custom-input form-review__item ${errors.telephone && 'is-invalid'}`}
            >
              <label>
                <span className="custom-input__label">Телефон
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  type="tel"
                  placeholder="Введите ваш номер"
                  autoFocus
                  {...registerWithMask('telephone', ['+79999999999'], {
                    required: {value: true, message: 'Телефон обязателен для ввода'},
                    validate: checkCorrectnessOfPhone
                  })}
                />
                {errors.telephone && <p className="custom-input__error">{errors.telephone.message}</p>}
              </label>

            </div>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleSubmit(onSubmit)}
              >
                <svg width="24" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"></use>
                </svg>Заказать
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseClick}>
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <span>Возникла ошибка</span>;
}
