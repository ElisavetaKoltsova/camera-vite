import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import Header from '../../components/header/header';
import NotFoundPage from '../not-found-page/not-found-page';
import Footer from '../../components/footer/footer';
import { AppRoute, Tab, URLParam } from '../../const';
import ProductRating from '../../components/product-rating/product-rating';
import { convertNumberIntoMoneyFormat, navigateToUpOfPage } from '../../utils/list';
import ReviewList from '../../components/review-list/review-list';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCurrentCameraAction, fetchReviewsAction, fetchSimilarCamerasAction } from '../../store/api-action';
import { getCameras, getCamerasDataLoadingStatus, getCurrentCamera, getSimilarCameras } from '../../store/product-data/selectors';
import Loader from '../../components/loader/loader';
import { getReviews, getReviewsDataLoadingStatus } from '../../store/review-data/selectors';
import { toggleAddItemPopupOpenStatus, toggleAddItemSuccessPopupOpenStatus, toggleReviewPopupOpen, toggleReviewSuccessPopupOpen } from '../../store/popup-process/popup-process';
import ReviewPopup from '../../components/popups/review-popup/review-popup';
import { getAddItemPopupOpenStatus, getAddItemSuccessPopupOpenStatus, getReviewPopupOpenStatus, getReviewSuccessPopupOpenStatus } from '../../store/popup-process/selectors';
import ReviewSuccessPopup from '../../components/popups/review-success/review-success-popup';
import ProductSimilarList from '../../components/product-similar-list/product-similar-list';
import { Camera } from '../../types/camera';
import { resetFilters } from '../../store/product-data/product-data';
import AddItemPopup from '../../components/popups/add-item-popup/add-item-popup';
import AddItemSuccessPopup from '../../components/popups/add-item-success-popup/add-item-success-popup';

export default function ProductPage(): JSX.Element {
  const { id: currentId } = useParams();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const urlTabParam = searchParams.get(URLParam.TabControl) || Tab.Description;
  const isCorrectUrl = Object.values(Tab).includes(urlTabParam as Tab);

  const [currentTab, setCurrentTab] = useState<Tab>(Tab.Description);

  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  useEffect(() => {
    dispatch(resetFilters());

    if (currentId) {
      dispatch(fetchCurrentCameraAction(currentId));
      dispatch(fetchReviewsAction(currentId));
      dispatch(fetchSimilarCamerasAction(currentId));
    }
  }, [currentId, dispatch]);

  useEffect(() => {
    navigateToUpOfPage();
  }, [pathname]);

  useEffect(() => {
    if (isCorrectUrl) {
      if (urlTabParam !== currentTab) {
        setCurrentTab(urlTabParam as Tab);
      }
    }
  }, [isCorrectUrl, urlTabParam, currentTab]);

  const currentProduct = useAppSelector(getCurrentCamera);
  const reviews = useAppSelector(getReviews);
  const similarCameras = useAppSelector(getSimilarCameras);
  const cameras = useAppSelector(getCameras);

  const isCameraDataLoading = useAppSelector(getCamerasDataLoadingStatus);
  const isReviewsDataLoading = useAppSelector(getReviewsDataLoadingStatus);

  const reviewPopupOpenStatus = useAppSelector(getReviewPopupOpenStatus);
  const reviewSuccessPopupOpenStatus = useAppSelector(getReviewSuccessPopupOpenStatus);

  const addItemPopupOpenStatus = useAppSelector(getAddItemPopupOpenStatus);
  const addItemSuccessPopupOpenStatus = useAppSelector(getAddItemSuccessPopupOpenStatus);

  const handleTabButtonClick = (tab: Tab) => {
    setCurrentTab(tab);

    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set(URLParam.TabControl, tab);
      return params;
    });
  };

  const handleReviewPopupButtonOpenToggleClick = () => {
    dispatch(toggleReviewPopupOpen());
  };

  const handleReviewSuccessPopupButtonToggleClick = () => {
    dispatch(toggleReviewSuccessPopupOpen());
  };

  const handleAddItemPopupButtonOpenClick = (id?: number) => {
    const currentCamera = cameras.find((camera) => camera.id === id);

    if (currentCamera) {
      setSelectedCamera(currentCamera);
      dispatch(toggleAddItemPopupOpenStatus());
    } else if (currentProduct) {
      setSelectedCamera(currentProduct);
      dispatch(toggleAddItemPopupOpenStatus());
    }
  };

  const handleAddItemPopupButtonCloseClick = () => {
    dispatch(toggleAddItemPopupOpenStatus());
  };

  const handleAddItemSuccessPopupButtonCloseClick = () => {
    dispatch(toggleAddItemSuccessPopupOpenStatus());
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
      <div className="wrapper" data-testid="product-page">
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
                    <button className="btn btn--purple" type="button" onClick={() => handleAddItemPopupButtonOpenClick()}>
                      <svg width="24" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-add-basket"></use>
                      </svg>Добавить в корзину
                    </button>
                    <div className="tabs product__tabs">
                      <div className="tabs__controls product__tabs-controls">
                        {
                          Object.values(Tab).map((value) => (
                            <button
                              className={`tabs__control ${currentTab === value ? 'is-active' : ''}`}
                              type="button" onClick={() => handleTabButtonClick(value)}
                              key={value}
                            >
                              {value}
                            </button>
                          ))
                        }
                      </div>
                      <div className="tabs__content">
                        <div className={`tabs__element ${currentTab === Tab.Characteristics ? 'is-active' : ''}`}>
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
                        <div className={`tabs__element ${currentTab === Tab.Description ? 'is-active' : ''}`}>
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
              <ProductSimilarList onClick={handleAddItemPopupButtonOpenClick} similarCameras={similarCameras} />
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

          {
            addItemPopupOpenStatus
              ?
              <AddItemPopup
                selectedCamera={selectedCamera}
                onCloseClick={handleAddItemPopupButtonCloseClick}
                onAddToBasketClick={handleAddItemSuccessPopupButtonCloseClick}
              />
              :
              ''
          }

          {
            addItemSuccessPopupOpenStatus
              ?
              <AddItemSuccessPopup
                onCloseClick={handleAddItemSuccessPopupButtonCloseClick}
              />
              :
              ''
          }
        </main>
        <Link className="up-btn" onClick={() => navigateToUpOfPage('smooth')} to='#header'>
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
