import { FormEvent, useEffect, useState } from 'react';
import { MAX_COUNT_OF_CAMERAS, MIN_COUNT_OF_CAMERAS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addCameraToBasket, changeNumberOfCamerasInBasket, removeCameraInBasket } from '../../store/product-data/product-data';
import { getCamerasInBasket } from '../../store/product-data/selectors';
import { Camera } from '../../types/camera';
import { convertNumberIntoMoneyFormat } from '../../utils/list';

type BasketItemProps = {
  camera: Camera;
  onDeleteClick: (id: number) => void;
}

export default function BasketItem({camera, onDeleteClick}: BasketItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const camerasInBasket = useAppSelector(getCamerasInBasket);

  const {
    id,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    name,
    vendorCode,
    price,
    type,
    category,
    level
  } = camera;

  const countOfProduct = camerasInBasket.filter((cameraInBasket) => cameraInBasket.id === id).length;
  const totalPrice = convertNumberIntoMoneyFormat(price * countOfProduct);
  const convertedPrice = convertNumberIntoMoneyFormat(price);

  const [numberOfCameras, setNumberOfCameras] = useState(countOfProduct);

  useEffect(() => {
    setNumberOfCameras(countOfProduct);
  }, [countOfProduct]);

  const handleIncreaseCountOfProductButtonClick = () => {
    dispatch(addCameraToBasket(camera));
  };

  const handleIncreaseCountOfProductInputBlur = (evt: FormEvent<HTMLInputElement>) => {
    const inputValue = Number(evt.currentTarget.value);

    if (inputValue >= MIN_COUNT_OF_CAMERAS && inputValue <= MAX_COUNT_OF_CAMERAS) {
      setNumberOfCameras(inputValue);
      dispatch(changeNumberOfCamerasInBasket({ camera, numberOfCameras: inputValue }));
    } else {
      const correctedValue = inputValue > MAX_COUNT_OF_CAMERAS ? MAX_COUNT_OF_CAMERAS : MIN_COUNT_OF_CAMERAS;
      setNumberOfCameras(correctedValue);
      dispatch(changeNumberOfCamerasInBasket({ camera, numberOfCameras: correctedValue }));
    }

    evt.currentTarget.value = '';
  };

  const handleDecreaseCountOfProductButtonClick = () => {
    dispatch(removeCameraInBasket({id, parameter: 'parameter'}));
  };

  return (
    <li className="basket-item">
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
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{convertedPrice} ₽</p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          disabled={countOfProduct <= MIN_COUNT_OF_CAMERAS}
          onClick={handleDecreaseCountOfProductButtonClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          type="number"
          id="counter1"
          placeholder={numberOfCameras.toString()}
          aria-label="количество товара"
          onBlur={handleIncreaseCountOfProductInputBlur}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          disabled={countOfProduct >= MAX_COUNT_OF_CAMERAS}
          onClick={handleIncreaseCountOfProductButtonClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{totalPrice} ₽</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={() => onDeleteClick(id)}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}
