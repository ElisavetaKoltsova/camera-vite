import { useEffect, useRef } from 'react';
import { useScroll } from '../../../hooks/use-scroll';
import { Camera } from '../../../types/camera';
import BasketShortItem from '../../basket-short-item/basket-short-item';
import { removeCameraInBasket } from '../../../store/product-data/product-data';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { getCamerasInBasket } from '../../../store/product-data/selectors';

type RemoveItemPopupProps = {
  selectedCamera: Camera | null;
  onCloseClick: () => void;
}

export default function RemoveItemPopup({selectedCamera, onCloseClick}: RemoveItemPopupProps): JSX.Element {
  const { disableScroll, enableScroll } = useScroll();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const camerasInBasket = useAppSelector(getCamerasInBasket);

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

  useEffect(() => {
    if (camerasInBasket.length) {
      onCloseClick();
    } else {
      navigate(AppRoute.Catalog);
      onCloseClick();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camerasInBasket]);

  const handleDeleteButtonClick = (id: number) => {
    dispatch(removeCameraInBasket({id}));
  };

  if (selectedCamera) {
    return (
      <div className="modal is-active" data-testid="remove-item-popup">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={onCloseClick} data-testid="overlay-darkened"></div>
          <div className="modal__content">
            <p className="title title--h4">Удалить этот товар?</p>
            <BasketShortItem selectedCamera={selectedCamera} />
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--half-width"
                type="button"
                onClick={() => handleDeleteButtonClick(selectedCamera.id)}
                ref={buttonRef}
              >
                Удалить
              </button>
              <Link className="btn btn--transparent modal__btn modal__btn--half-width" to={AppRoute.Catalog}>Продолжить покупки
              </Link>
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
