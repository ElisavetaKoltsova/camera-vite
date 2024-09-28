import { useAppDispatch } from '../../hooks';
import { decreaseCountOfCamerasInBasket, increaseCountOfCamerasInBasket } from '../../store/product-data/product-data';
import { Camera } from '../../types/camera';
import { convertNumberIntoMoneyFormat } from '../../utils/list';

type BasketItemProps = {
  camera: Camera;
  onDeleteClick: (id: number) => void;
}

export default function BasketItem({camera, onDeleteClick}: BasketItemProps): JSX.Element {
  const dispatch = useAppDispatch();

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
    level,
    countInBasket
  } = camera;

  const countOfProduct = countInBasket ? countInBasket : 1;
  const totalPrice = convertNumberIntoMoneyFormat(price * countOfProduct);
  const convertedPrice = convertNumberIntoMoneyFormat(price);

  const handleIncreaseCountOfProductButtonClick = () => {
    dispatch(increaseCountOfCamerasInBasket(id));
  };

  const handleDecreaseCountOfProductButtonClick = () => {
    dispatch(decreaseCountOfCamerasInBasket(id));
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
          disabled={countOfProduct === 1}
          onClick={handleDecreaseCountOfProductButtonClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1" value={countOfProduct} min="1" max="99" aria-label="количество товара" readOnly/>
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
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
