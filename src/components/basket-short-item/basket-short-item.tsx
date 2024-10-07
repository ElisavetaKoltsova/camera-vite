import { Camera } from '../../types/camera';
import { convertNumberIntoMoneyFormat } from '../../utils/list';

type BasketShortItemProps = {
  selectedCamera: Camera;
}

export default function BasketShortItem({selectedCamera}: BasketShortItemProps): JSX.Element {
  const {
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    vendorCode,
    name,
    type,
    level,
    category,
    price
  } = selectedCamera;

  const convertedPrice = convertNumberIntoMoneyFormat(price);

  return (
    <div className="basket-item basket-item--short">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`} />
          <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="140" height="120" alt={name} />
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
  );
}
