import { Link, useLocation } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import CatalogCardList from '../../components/catalog-card-list/catalog-card-list';
import Footer from '../../components/footer/footer';
import { getCameras, getCamerasDataLoadingStatus } from '../../store/product-data/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Loader from '../../components/loader/loader';
import { useEffect, useState } from 'react';
import CallItemPopup from '../../components/popups/call-item-popup/call-item-popup';
import { Camera } from '../../types/camera';
import { toggleAddItemPopupOpenStatus, toggleAddItemSuccessPopupOpenStatus, toggleCallItemPopupOpenStatus } from '../../store/popup-process/popup-process';
import { getAddItemPopupOpenStatus, getAddItemSuccessPopupOpenStatus, getCallItemPopupOpenStatus } from '../../store/popup-process/selectors';
import AddItemPopup from '../../components/popups/add-item-popup/add-item-popup';
import AddItemSuccessPopup from '../../components/popups/add-item-success-popup/add-item-success-popup';

export default function CatalogPage(): JSX.Element {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const cameras = useAppSelector(getCameras);
  const isCamerasDataLoading = useAppSelector(getCamerasDataLoadingStatus);

  const isCallItemPopupOpenStatus = useAppSelector(getCallItemPopupOpenStatus);
  const isAddItemPopupOpenStatus = useAppSelector(getAddItemPopupOpenStatus);
  const isAddItemSuccessPopupOpenStatus = useAppSelector(getAddItemSuccessPopupOpenStatus);

  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

  const handlePopupButtonOrderToggleClick = () => {
    dispatch(toggleAddItemPopupOpenStatus());
  };

  const handlePopupButtonAddToCardToggleClick = () => {
    dispatch(toggleAddItemSuccessPopupOpenStatus());
  };

  return (
    <div className="wrapper">
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
                  <img src="img/banner.png" />
                  <CatalogFilter />
                </div>
                <div className="catalog__content">
                  <CatalogSort />
                  {
                    isCamerasDataLoading
                      ? <Loader />
                      : <CatalogCardList cameras={cameras} onClick={handlePopupButtonOpenClick} />
                  }
                  {/* <!--<div className="pagination">
                    <ul className="pagination__list">
                      <li className="pagination__item"><a className="pagination__link pagination__link&#45;&#45;active" href="1">1</a>
                      </li>
                      <li className="pagination__item"><a className="pagination__link" href="2">2</a>
                      </li>
                      <li className="pagination__item"><a className="pagination__link" href="3">3</a>
                      </li>
                      <li className="pagination__item"><a className="pagination__link pagination__link&#45;&#45;text" href="2">Далее</a>
                      </li>
                    </ul>
                  </div>--> */}
                </div>
              </div>
            </div>
          </section>
        </div>
        {
          isCallItemPopupOpenStatus
            ?
            <CallItemPopup
              selectedCamera={selectedCamera}
              onCloseClick={handlePopupButtonCloseClick}
              onOrderClick={handlePopupButtonOrderToggleClick}
            />
            :
            ''
        }

        {
          isAddItemPopupOpenStatus
            ?
            <AddItemPopup
              selectedCamera={selectedCamera}
              onCloseClick={handlePopupButtonOrderToggleClick}
              onAddToCardClick={handlePopupButtonAddToCardToggleClick}
            />
            :
            ''
        }

        {
          isAddItemSuccessPopupOpenStatus
            ?
            <AddItemSuccessPopup
              onCloseClick={handlePopupButtonAddToCardToggleClick}
            />
            :
            ''
        }
      </main>
      <Footer />
    </div>
  );
}
