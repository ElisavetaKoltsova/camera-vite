import { HelmetProvider } from 'react-helmet-async';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import ProductPage from '../../pages/product-page/product-page';
import BasketPage from '../../pages/basket-page/basket-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ScrollProvider from '../scroll-provider/scroll-provider';

export default function App(): JSX.Element {
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
