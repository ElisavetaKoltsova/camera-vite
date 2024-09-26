import { useEffect } from 'react';
import { useScroll } from '../../hooks/use-scroll';
import { Camera } from '../../types/camera';
import { convertNumberIntoMoneyFormat } from '../../utils/list';

type CallItemPopupProps = {
  selectedCamera: Camera | null;
  onClick: () => void;
}

export default function CallItemPopup({selectedCamera, onClick}: CallItemPopupProps): JSX.Element {
  const { disableScroll, enableScroll } = useScroll();

  useEffect(() => {
    const handleEscKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClick();
      }
    };

    document.addEventListener('keydown', handleEscKeyDown);

    disableScroll();
    return () => {
      enableScroll();
      document.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [disableScroll, enableScroll, onClick]);


  if (selectedCamera) {
    const {
      name,
      previewImg,
      previewImg2x,
      previewImgWebp,
      previewImgWebp2x,
      vendorCode,
      type,
      category,
      level,
      price
    } = selectedCamera;

    const convertedPrice = convertNumberIntoMoneyFormat(price);

    return (
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={onClick}></div>
          <div className="modal__content">
            <p className="title title--h4">Свяжитесь со мной</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x}`} />
                  <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="140" height="120" alt={name} />
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{type} {category}</li>
                  <li className="basket-item__list-item">{level} уровень</li>
                </ul>
                <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{convertedPrice} ₽</p>
              </div>
            </div>
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
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
                <svg width="24" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"></use>
                </svg>Заказать
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onClick}>
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
