import { useEffect } from 'react';
import { useScroll } from '../../../hooks/use-scroll';
import { Camera } from '../../../types/camera';
import BasketShortItem from '../../basket-short-item/basket-short-item';

type CallItemPopupProps = {
  selectedCamera: Camera | null;
  onCloseClick: () => void;
  onOrderClick: () => void;
}

export default function CallItemPopup({selectedCamera, onCloseClick, onOrderClick}: CallItemPopupProps): JSX.Element {
  const { disableScroll, enableScroll } = useScroll();

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


  if (selectedCamera) {
    return (
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={onCloseClick}></div>
          <div className="modal__content">
            <p className="title title--h4">Свяжитесь со мной</p>
            <BasketShortItem selectedCamera={selectedCamera}/>
            <div className="custom-input form-review__item">
              <label>
                <span className="custom-input__label">Телефон
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input type="tel" name="user-tel" placeholder="Введите ваш номер" required />
              </label>
              <p className="custom-input__error">Нужно указать номер</p>
            </div>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={onOrderClick}>
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
