import { Link, useLocation } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import CatalogCardList from '../../components/catalog-card-list/catalog-card-list';
import Footer from '../../components/footer/footer';
import { getCameras, getCamerasDataLoadingStatus } from '../../store/product-data/selectors';
import { useAppSelector } from '../../hooks';
import Loader from '../../components/loader/loader';
import { useEffect } from 'react';

export default function CatalogPage(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const isCamerasDataLoading = useAppSelector(getCamerasDataLoadingStatus);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
                      : <CatalogCardList cameras={cameras} />
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
      </main>
      <Footer />
    </div>
  );
}
