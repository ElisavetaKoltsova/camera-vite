import { HelmetProvider } from 'react-helmet-async';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, LocalStorageName } from '../../const';
import ProductPage from '../../pages/product-page/product-page';
import BasketPage from '../../pages/basket-page/basket-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ScrollProvider from '../scroll-provider/scroll-provider';
import { useEffect } from 'react';
import { setCamerasInBasket } from '../../store/product-data/product-data';
import { Camera } from '../../types/camera';
import { useAppDispatch } from '../../hooks';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localStorageData = localStorage.getItem(LocalStorageName.CamerasInBasket);
    const cameraInBasket = JSON.parse(localStorageData ? localStorageData : '') as Camera[];

    if (cameraInBasket.length) {
      dispatch(setCamerasInBasket(cameraInBasket));
    }
  }, [dispatch]);

  return (
    <ScrollProvider>
      <HelmetProvider>
        <Routes>
          <Route
            path={AppRoute.Catalog}
            element={<CatalogPage />}
          />
          <Route path={AppRoute.Product}>
            <Route
              path={AppRoute.ProductId}
              element={<ProductPage />}
            />
          </Route>
          <Route
            path={AppRoute.Basket}
            element={<BasketPage />}
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>
      </HelmetProvider>
    </ScrollProvider>
  );
}
