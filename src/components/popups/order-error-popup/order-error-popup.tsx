import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useScroll } from '../../../hooks/use-scroll';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../hooks';
import { getOrderDataLoadingStatus } from '../../../store/order-data/selectors';
import Loader from '../../loader/loader';

type OrderErrorPopupProps = {
  onCloseClick: () => void;
}

export default function OrderErrorPopup({onCloseClick}: OrderErrorPopupProps): JSX.Element {
  const navigate = useNavigate();

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { disableScroll, enableScroll } = useScroll();
  const isOrderDataLoading = useAppSelector(getOrderDataLoadingStatus);

  useEffect(() => {
    const handleEscKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseClick();
      }
    };

    document.addEventListener('keydown', handleEscKeyDown);
    disableScroll();

    if (buttonRef.current) {
      buttonRef.current.focus();
    }

    return () => {
      enableScroll();
      document.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [disableScroll, enableScroll, onCloseClick]);

  const handleCloseButtonClick = () => {
    onCloseClick();
  };

  const handleBackToShopButtonClick = () => {
    onCloseClick();
    navigate(AppRoute.Catalog);
  };

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleCloseButtonClick}></div>
        {
          isOrderDataLoading
            ? <Loader />
            :
            <div className="modal__content">
              <p className="title title--h4">Ошибка при оформлении заказа</p>
              <div className="modal__buttons">
                <button
                  className="btn btn--purple modal__btn modal__btn--fit-width"
                  type="button"
                  onClick={handleBackToShopButtonClick}
                  ref={buttonRef}
                >
                  Вернуться к покупкам
                </button>
              </div>
              <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleCloseButtonClick}>
                <svg width="10" height="10" aria-hidden="true">
                  <use xlinkHref="#icon-close"></use>
                </svg>
              </button>
            </div>
        }
      </div>
    </div>
  );
}
