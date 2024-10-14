import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withScrollProvider, withStore } from '../../utils/mock-components';
import App from './app';
import { makeFakeCamera, makeFakeStore } from '../../utils/mock';
import { AppRoute } from '../../const';
import { render, screen } from '@testing-library/react';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.scrollTo = vi.fn(() => {});
  });

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "CatalogPage" when user navigate to "/"', () => {
    const expectedTestId = 'catalog-page';
    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(<App />),
        mockHistory
      ),
      makeFakeStore()
    );

    mockHistory.push(AppRoute.Catalog);

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it('should render "ProductPage" when user navigate to "/product/id"', () => {
    const expectedTestId = 'product-page';
    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(<App />),
        mockHistory
      ),
      makeFakeStore()
    );
    const fakeCamera = makeFakeCamera();

    mockHistory.push(`${AppRoute.Product}/${fakeCamera.id}`);

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it('should render "BasketPage" when user navigate to "/basket"', () => {
    const expectedTestId = 'basket-page';
    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(<App />),
        mockHistory
      ),
      makeFakeStore()
    );

    mockHistory.push(AppRoute.Basket);

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });


  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    const expectedTestId = 'not-found-page';
    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(<App />),
        mockHistory
      ),
      makeFakeStore()
    );

    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
