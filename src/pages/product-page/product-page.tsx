import { Link, useLocation, useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import NotFoundPage from '../not-found-page/not-found-page';
import Footer from '../../components/footer/footer';
import { AppRoute } from '../../const';
import ProductRating from '../../components/product-rating/product-rating';
import { convertNumberIntoMoneyFormat } from '../../utils/list';
import ReviewList from '../../components/review-list/review-list';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCurrentCameraAction, fetchReviewsAction } from '../../store/api-action';
import { getCamerasDataLoadingStatus, getCurrentCamera } from '../../store/product-data/selectors';
import Loader from '../../components/loader/loader';
import { getReviews, getReviewsDataLoadingStatus } from '../../store/review-data/selectors';

export default function ProductPage(): JSX.Element {
  const { id: currentId } = useParams();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (currentId) {
      dispatch(fetchCurrentCameraAction(currentId));
      dispatch(fetchReviewsAction(currentId));
    }
  }, [currentId, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const currentProduct = useAppSelector(getCurrentCamera);
  const reviews = useAppSelector(getReviews);

  const isCameraDataLoading = useAppSelector(getCamerasDataLoadingStatus);
  const isReviewsDataLoading = useAppSelector(getReviewsDataLoadingStatus);

  if (isCameraDataLoading) {
    return <Loader />;
  }

  if (currentProduct) {
    const {
      name,
      previewImg,
      previewImg2x,
      previewImgWebp,
      previewImgWebp2x,
      rating,
      reviewCount,
      price,
      description,
      vendorCode,
      category,
      type,
      level
    } = currentProduct;

    const convertedPrice = convertNumberIntoMoneyFormat(price);

    return (
      <div className="wrapper">
        <Header />
        <main>
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Главная
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Каталог
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{name}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`} />
                      <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="560" height="480" alt={name} />
                    </picture>
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">{name}</h1>
                    <div className="rate product__rate">
                      <ProductRating rating={rating} reviewCount={reviewCount} />
                    </div>
                    <p className="product__price"><span className="visually-hidden">Цена:</span>{convertedPrice} ₽</p>
                    <button className="btn btn--purple" type="button">
                      <svg width="24" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-add-basket"></use>
                      </svg>Добавить в корзину
                    </button>
                    <div className="tabs product__tabs">
                      <div className="tabs__controls product__tabs-controls">
                        <button className="tabs__control" type="button">Характеристики</button>
                        <button className="tabs__control is-active" type="button">Описание</button>
                      </div>
                      <div className="tabs__content">
                        <div className="tabs__element">
                          <ul className="product__tabs-list">
                            <li className="item-list"><span className="item-list__title">Артикул:</span>
                              <p className="item-list__text">{vendorCode}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Категория:</span>
                              <p className="item-list__text">{category}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                              <p className="item-list__text">{type}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Уровень:</span>
                              <p className="item-list__text">{level}</p>
                            </li>
                          </ul>
                        </div>
                        <div className="tabs__element is-active">
                          <div className="product__tabs-text">
                            {description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="page-content__section">
              <section className="review-block">
                <div className="container">
                  <div className="page-content__headed">
                    <h2 className="title title--h3">Отзывы</h2>
                    <button className="btn" type="button">Оставить свой отзыв</button>
                  </div>
                  {
                    isReviewsDataLoading ? <Loader /> : <ReviewList reviews={reviews} />
                  }
                  <div className="review-block__buttons">
                    <button className="btn btn--purple" type="button">Показать больше отзывов
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
        <Link className="up-btn" to="#header">
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </Link>
        <Footer />
      </div>
    );
  }

  return <NotFoundPage />;
}
