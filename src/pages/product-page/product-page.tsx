import { Link, useLocation, useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import NotFoundPage from '../not-found-page/not-found-page';
import Footer from '../../components/footer/footer';
import { AppRoute } from '../../const';
import ProductRating from '../../components/product-rating/product-rating';
import { convertNumberIntoMoneyFormat, navigateToUpOfPage } from '../../utils/list';
import ReviewList from '../../components/review-list/review-list';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCurrentCameraAction, fetchReviewsAction, fetchSimilarCamerasAction } from '../../store/api-action';
import { getCamerasDataLoadingStatus, getCurrentCamera, getSimilarCameras } from '../../store/product-data/selectors';
import Loader from '../../components/loader/loader';
import { getReviews, getReviewsDataLoadingStatus } from '../../store/review-data/selectors';
import { toggleCallItemPopupOpenStatus, toggleReviewPopupOpen, toggleReviewSuccessPopupOpen } from '../../store/popup-process/popup-process';
import ReviewPopup from '../../components/popups/review-popup/review-popup';
import { getReviewPopupOpenStatus, getReviewSuccessPopupOpenStatus } from '../../store/popup-process/selectors';
import ReviewSuccessPopup from '../../components/popups/review-success/review-success-popup';
import ProductSimilarList from '../../components/product-similar-list/product-similar-list';

export default function ProductPage(): JSX.Element {
  const { id: currentId } = useParams();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [characteristicsStatus, setCharacteristicsStatus] = useState<boolean>(false);
  const [descriptionStatus, setDescriptionStatus] = useState<boolean>(true);

  useEffect(() => {
    if (currentId) {
      dispatch(fetchCurrentCameraAction(currentId));
      dispatch(fetchReviewsAction(currentId));
      dispatch(fetchSimilarCamerasAction(currentId));
    }
  }, [currentId, dispatch]);

  useEffect(() => {
    navigateToUpOfPage();
  }, [pathname]);

  const currentProduct = useAppSelector(getCurrentCamera);
  const reviews = useAppSelector(getReviews);
  const similarCameras = useAppSelector(getSimilarCameras);

  const isCameraDataLoading = useAppSelector(getCamerasDataLoadingStatus);
  const isReviewsDataLoading = useAppSelector(getReviewsDataLoadingStatus);

  const reviewPopupOpenStatus = useAppSelector(getReviewPopupOpenStatus);
  const reviewSuccessPopupOpenStatus = useAppSelector(getReviewSuccessPopupOpenStatus);

  const handleTabButtonClick = () => {
    setCharacteristicsStatus(!characteristicsStatus);
    setDescriptionStatus(!descriptionStatus);
  };

  const handleReviewPopupButtonOpenToggleClick = () => {
    dispatch(toggleReviewPopupOpen());
  };

  const handleReviewSuccessPopupButtonToggleClick = () => {
    dispatch(toggleReviewSuccessPopupOpen());
  };

  const handleBuyPopupButtonToggleClick = () => {
    if (currentProduct) {
      dispatch(toggleCallItemPopupOpenStatus());
    }
  };

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
                        <button className={`tabs__control ${characteristicsStatus ? 'is-active' : ''}`} type="button" onClick={handleTabButtonClick}>Характеристики</button>
                        <button className={`tabs__control ${descriptionStatus ? 'is-active' : ''}`} type="button" onClick={handleTabButtonClick}>Описание</button>
                      </div>
                      <div className="tabs__content">
                        <div className={`tabs__element ${characteristicsStatus ? 'is-active' : ''}`}>
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
                        <div className={`tabs__element ${descriptionStatus ? 'is-active' : ''}`}>
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
              <ProductSimilarList onClick={handleBuyPopupButtonToggleClick} similarCameras={similarCameras} />
            </div>
            <div className="page-content__section">
              {
                isReviewsDataLoading ? <Loader /> : <ReviewList reviews={reviews} />
              }
            </div>
          </div>
          {
            reviewPopupOpenStatus
              ?
              <ReviewPopup onCloseClick={handleReviewPopupButtonOpenToggleClick} />
              :
              ''
          }

          {
            reviewSuccessPopupOpenStatus
              ?
              <ReviewSuccessPopup onCloseClick={handleReviewSuccessPopupButtonToggleClick}/>
              :
              ''
          }
        </main>
        <Link className="up-btn" onClick={navigateToUpOfPage} to='#header'>
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
