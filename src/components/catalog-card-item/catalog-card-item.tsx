import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';
import { convertNumberIntoMoneyFormat } from '../../utils/list';
import { AppRoute } from '../../const';
import ProductRating from '../product-rating/product-rating';
import { useAppSelector } from '../../hooks';
import { getCamerasInBasket } from '../../store/product-data/selectors';

type CatalogCardItemProps = {
  camera: Camera;
  onClick: (id: number) => void;
  isActiveClass?: string;
}

export default function CatalogCardItem({camera, onClick, isActiveClass = ''}: CatalogCardItemProps): JSX.Element {
  const {
    id,
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

  const camerasInBasket = useAppSelector(getCamerasInBasket);
  const isCurrentCameraInBasket = camerasInBasket.find((currentCamera) => currentCamera.id === camera.id) !== undefined;

  return (
    <div className={`product-card ${isActiveClass}`} data-testid="catalog-card-item">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`} />
          <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="280" height="240" alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <ProductRating rating={rating} reviewCount={reviewCount} />
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{convertedPrice} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {
          isCurrentCameraInBasket
            ?
            <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoute.Basket}>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-basket"></use>
              </svg>
              В корзине
            </Link>
            :
            <button className="btn btn--purple product-card__btn" type="button" onClick={() => onClick(id)}>
              Купить
            </button>
        }
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}
