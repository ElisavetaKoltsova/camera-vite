import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useAppDispatch } from '../../../hooks';
import { toggleAddItemSuccessPopupOpenStatus } from '../../../store/popup-process/popup-process';
import { useScroll } from '../../../hooks/use-scroll';
import { useEffect } from 'react';

type AddItemSuccessPopupProps = {
  onCloseClick: () => void;
}

export default function AddItemSuccessPopup({onCloseClick}: AddItemSuccessPopupProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const handleToBasketButtonClick = () => {
    dispatch(toggleAddItemSuccessPopupOpenStatus());
    navigate(AppRoute.Basket);
  };

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onCloseClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons"><a className="btn btn--transparent modal__btn" href="#">Продолжить покупки</a>
            <button className="btn btn--purple modal__btn modal__btn--fit-width" onClick={handleToBasketButtonClick}>Перейти в корзину</button>
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
