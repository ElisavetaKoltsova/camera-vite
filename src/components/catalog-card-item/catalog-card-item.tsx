import { Link } from 'react-router-dom';
import { Camera } from '../../types/cameras';
import { convertNumberIntoMoneyFormat } from '../../utils/list';

type CatalogCardItemProps = {
  camera: Camera;
}

const stars = [1, 2, 3, 4, 5];

export default function CatalogCardItem({camera}: CatalogCardItemProps): JSX.Element {
  const {
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    rating,
    reviewCount,
    price
  } = camera;

  const convertedPrice = convertNumberIntoMoneyFormat(price);

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x}`} />
          <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="280" height="240" alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            stars.map((star) => {
              const classOfStar = star <= rating ? '#icon-full-star' : '#icon-star';
              return (
                <svg width="17" height="16" aria-hidden="true" key={star}>
                  <use xlinkHref={classOfStar}></use>
                </svg>
              );
            })
          }
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{convertedPrice} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to="#">
          Подробнее
        </Link>
      </div>
    </div>
  );
}
