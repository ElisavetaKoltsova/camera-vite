import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Header from '../../components/header/header';
import { AppRoute, CameraCategory, CameraLevel, CameraType, COUNT_OF_CAMERAS_ON_PAGE, PRICE_FROM, PRICE_TO, URLParam } from '../../const';
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
import { filterCamerasCategory, filterCamerasLevel, filterCamerasPrice, filterCamerasType, resetFilters } from '../../store/product-data/product-data';
import { sort } from '../../utils/sort';
import Pagination from '../../components/pagination/pagination';
import { filterPrice } from '../../utils/filter';

export default function CatalogPage(): JSX.Element {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const cameras = useAppSelector(getCameras);
  const filteredCameras = useAppSelector(getFilteredCameras);
  const isCamerasDataLoading = useAppSelector(getCamerasDataLoadingStatus);

  const currentSort = useAppSelector(getSort);

  const categoryFilter = useAppSelector(getCategoryFilter);
  const typeFilters = useAppSelector(getTypeFilter);
  const levelFilters = useAppSelector(getLevelFilter);

  const [selectedCategory, setSelectedCategory] = useState<CameraCategory | null>(categoryFilter);
  const [selectedTypes, setSelectedTypes] = useState<CameraType[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<CameraLevel[]>([]);

  const callItemPopupOpenStatus = useAppSelector(getCallItemPopupOpenStatus);

  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  const priceFrom = useAppSelector(getPriceFrom);
  const priceTo = useAppSelector(getPriceTo);

  const priceFromParam = Number(searchParams.get(URLParam.PriceFrom));
  const priceToParam = Number(searchParams.get(URLParam.PriceTo));

  const isValidPriceFrom = !isNaN(priceFromParam) && priceFromParam > PRICE_FROM;
  const isValidPriceTo = !isNaN(priceToParam) && priceToParam < PRICE_TO && priceToParam >= priceFromParam && priceFromParam > PRICE_FROM;

  const validPriceFrom = isValidPriceFrom ? priceFromParam : priceFrom;
  const validPriceTo = isValidPriceTo ? priceToParam : priceTo;

  let usedCameras: Camera[] = cameras;

  if (categoryFilter || typeFilters.length || levelFilters.length) {
    usedCameras = [...filteredCameras];
  }

  usedCameras = sort[currentSort]([...usedCameras]);
  usedCameras = filterPrice(usedCameras, validPriceFrom, validPriceTo);

  const currentPage = Number(searchParams.get('page')) || 1;
  const countOfPage: number = Math.ceil(usedCameras.length / COUNT_OF_CAMERAS_ON_PAGE);

  const camerasCountFrom = (currentPage - 1) * COUNT_OF_CAMERAS_ON_PAGE;
  const camerasCountTo = currentPage * COUNT_OF_CAMERAS_ON_PAGE > usedCameras.length ? usedCameras.length : currentPage * COUNT_OF_CAMERAS_ON_PAGE;
  const visibleCameras = usedCameras.slice(camerasCountFrom, camerasCountTo);

  // useEffect(() => {
  //   if (currentPage > countOfPage) {
  //     setSearchParams((prevParams) => {
  //       const params = new URLSearchParams(prevParams);
  //       params.set(URLParam.Page, '1');
  //       return params;
  //     });
  //   }
  // }, [currentPage, countOfPage, setSearchParams, usedCameras]);

  useEffect(() => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set(URLParam.Page, currentPage.toString());
      return params;
    });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    navigateToUpOfPage();
  }, [pathname]);

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterCamerasPrice({priceFrom: validPriceFrom, priceTo: validPriceTo}));
  }, [dispatch, validPriceFrom, validPriceTo]);

  useEffect(() => {
    const categoryParam = searchParams.get(URLParam.FilterOfCategory);
    const isValidCategory = categoryParam && Object.values(CameraCategory).includes(categoryParam as CameraCategory);

    const typesParam = (searchParams.get(URLParam.FilterOfTypes)?.split(' ') || []) as CameraType[];
    let validTypes = typesParam.filter((type) => Object.values(CameraType).includes(type));

    const levelsParam = (searchParams.get(URLParam.FilterOfLevels)?.split(' ') || []) as CameraLevel[];
    const validLevels = levelsParam.filter((level) => Object.values(CameraLevel).includes(level));

    if (categoryParam === CameraCategory.videocamera) {
      validTypes = validTypes.filter(
        (type) => type !== CameraType.film && type !== CameraType.snapshot
      );

      setSearchParams((prevParams) => {
        const params = new URLSearchParams(prevParams);
        params.set(URLParam.FilterOfTypes, validTypes.join(' '));
        return params;
      });
    }

    setSelectedCategory(isValidCategory ? (categoryParam as CameraCategory) : null);
    setSelectedTypes(validTypes);
    setSelectedLevels(validLevels);

    if (isValidCategory) {
      dispatch(filterCamerasCategory(categoryParam as CameraCategory));
    }
    if (validTypes.length) {
      dispatch(filterCamerasType(validTypes));
    }
    if (validLevels.length) {
      dispatch(filterCamerasLevel(validLevels));
    }
  }, [dispatch, searchParams, setSearchParams]);

  useEffect(() => {
    dispatch(filterCamerasCategory(categoryFilter));
    dispatch(filterCamerasType(typeFilters));
    dispatch(filterCamerasLevel(levelFilters));
  }, [categoryFilter, typeFilters, levelFilters, dispatch]);

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
                  <CatalogFilter
                    priceFromParam={validPriceFrom}
                    priceToParam={validPriceTo}
                    categoryFilter={selectedCategory}
                    typeFilters={selectedTypes}
                    levelFilters={selectedLevels}
                  />
                </div>
                <div className="catalog__content">
                  <CatalogSort />
                  {
                    isCamerasDataLoading
                      ? <Loader />
                      : <CatalogCardList cameras={visibleCameras} onClick={handlePopupButtonOpenClick} />
                  }
                  {
                    usedCameras.length < COUNT_OF_CAMERAS_ON_PAGE
                      ? ''
                      : <Pagination currentPage={currentPage} countOfPage={countOfPage} />
                  }
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
