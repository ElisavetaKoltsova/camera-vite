import { useEffect, useRef } from 'react';
import { useScroll } from '../../../hooks/use-scroll';
import { Camera } from '../../../types/camera';
import BasketShortItem from '../../basket-short-item/basket-short-item';
import { useAppDispatch } from '../../../hooks';
import { addCameraToBasket } from '../../../store/product-data/product-data';

type AddItemPopupProps = {
  selectedCamera: Camera | null;
  onCloseClick: () => void;
  onAddToBasketClick: () => void;
}

export default function AddItemPopup({selectedCamera, onCloseClick, onAddToBasketClick}: AddItemPopupProps): JSX.Element {
  const { disableScroll, enableScroll } = useScroll();
  const dispatch = useAppDispatch();
  const addToBasketButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleEscKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseClick();
      }
    };

    document.addEventListener('keydown', handleEscKeyDown);
    disableScroll();

    if (addToBasketButtonRef.current) {
      addToBasketButtonRef.current.focus();
    }

    return () => {
      enableScroll();
      document.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [disableScroll, enableScroll, onCloseClick]);

  const handleAddToBasketButtonClick = () => {
    if (selectedCamera) {
      dispatch(addCameraToBasket(selectedCamera));
      onAddToBasketClick();
    }
  };

  if (selectedCamera) {
    return (
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={onCloseClick}></div>
          <div className="modal__content">
            <p className="title title--h4">Добавить товар в корзину</p>
            <BasketShortItem selectedCamera={selectedCamera} />
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={handleAddToBasketButtonClick}
                ref={addToBasketButtonRef}
              >
                <svg width="24" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"></use>
                </svg>Добавить в корзину
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
