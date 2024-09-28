import { useEffect } from 'react';
import { useScroll } from '../../../hooks/use-scroll';
import { Camera } from '../../../types/camera';
import BasketShortItem from '../../basket-short-item/basket-short-item';
import { removeCameraInBasket } from '../../../store/product-data/product-data';
import { useAppDispatch } from '../../../hooks';

type RemoveItemPopupProps = {
  selectedCamera: Camera | null;
  onCloseClick: () => void;
}

export default function RemoveItemPopup({selectedCamera, onCloseClick}: RemoveItemPopupProps): JSX.Element {
  const { disableScroll, enableScroll } = useScroll();
  const dispatch = useAppDispatch();

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

  const handleDeleteButtonClick = (id: number) => {
    dispatch(removeCameraInBasket(id));
    onCloseClick();
  };

  if (selectedCamera) {
    return (
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={onCloseClick}></div>
          <div className="modal__content">
            <p className="title title--h4">Удалить этот товар?</p>
            <BasketShortItem selectedCamera={selectedCamera} />
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={() => handleDeleteButtonClick(selectedCamera.id)}>Удалить
              </button>
              <a className="btn btn--transparent modal__btn modal__btn--half-width" href="#">Продолжить покупки
              </a>
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