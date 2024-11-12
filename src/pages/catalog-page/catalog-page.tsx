import { Link, useLocation } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';
import CatalogCardList from '../../components/catalog-card-list/catalog-card-list';
import Footer from '../../components/footer/footer';
import { getCameras, getCamerasDataLoadingStatus, getCategoryFilter, getFilteredCameras, getLevelFilter, getPriceFrom, getPriceTo, getSort, getTypeFilter } from '../../store/product-data/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Loader from '../../components/loader/loader';
import { useEffect, useState } from 'react';
import CallItemPopup from '../../components/popups/call-item-popup/call-item-popup';
import { Camera } from '../../types/camera';
import { toggleCallItemPopupOpenStatus } from '../../store/popup-process/popup-process';
import { getCallItemPopupOpenStatus } from '../../store/popup-process/selectors';
import { navigateToUpOfPage } from '../../utils/list';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import { resetFilters } from '../../store/product-data/product-data';
import { sort } from '../../utils/sort';
import { filterPrice } from '../../utils/filter';

export default function CatalogPage(): JSX.Element {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const cameras = useAppSelector(getCameras);
  const filteredCameras = useAppSelector(getFilteredCameras);
  const isCamerasDataLoading = useAppSelector(getCamerasDataLoadingStatus);

  const categoryFilter = useAppSelector(getCategoryFilter);
  const typeFilter = useAppSelector(getTypeFilter);
  const levelFilter = useAppSelector(getLevelFilter);

  const currentSort = useAppSelector(getSort);

  const callItemPopupOpenStatus = useAppSelector(getCallItemPopupOpenStatus);

  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  const priceFrom = useAppSelector(getPriceFrom);
  const priceTo = useAppSelector(getPriceTo);

  let usedCameras: Camera[] = filterPrice(cameras, priceFrom, priceTo);

  if (categoryFilter || typeFilter.length > 0 || levelFilter.length > 0) {
    usedCameras = [...filteredCameras];
  }

  usedCameras = sort[currentSort]([...usedCameras]);

  useEffect(() => {
    navigateToUpOfPage();
  }, [pathname]);

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const handlePopupButtonOpenClick = (id: number) => {
    const currentCamera = cameras.find((camera) => camera.id === id);

    if (currentCamera) {
      setSelectedCamera(currentCamera);
      dispatch(toggleCallItemPopupOpenStatus());
    }
  };

  const handlePopupButtonCloseClick = () => {
    dispatch(toggleCallItemPopupOpenStatus());
  };

  return (
    <div className="wrapper" data-testid="catalog-page">
      <Header />
      <main>
        <Banner />
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
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  {/* <img src="img/banner.png" /> */}
                  <CatalogFilter />
                </div>
                <div className="catalog__content">
                  <CatalogSort />
                  {
                    isCamerasDataLoading
                      ? <Loader />
                      : <CatalogCardList cameras={usedCameras} onClick={handlePopupButtonOpenClick} />
                  }
                  {/* <Pagination /> */}
                </div>
              </div>
            </div>
          </section>
        </div>
        {
          callItemPopupOpenStatus
            ?
            <CallItemPopup
              selectedCamera={selectedCamera}
              onCloseClick={handlePopupButtonCloseClick}
            />
            :
            ''
        }
      </main>
      <Footer />
    </div>
  );
}
