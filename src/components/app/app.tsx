import { HelmetProvider } from 'react-helmet-async';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Catalog}
          element={<CatalogPage />}
        />
      </Routes>
    </HelmetProvider>
  );
}
