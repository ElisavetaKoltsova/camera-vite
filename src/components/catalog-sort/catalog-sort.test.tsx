import { fireEvent, render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import CatalogSort from './catalog-sort';

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    const expectedTestId = 'catalog-sort';
    const { withStoreComponent } = withStore(
      withHistory(<CatalogSort />),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it('should initialize with the correct sort', () => {
    const expectedByPriceTestId = 'by-price';
    const expectedUpPriceTestId = 'up';

    const { withStoreComponent } = withStore(
      withHistory(<CatalogSort />),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedByPriceTestId)).toBeChecked();
    expect(screen.getByTestId(expectedUpPriceTestId)).toBeChecked();
  });

  it('should change sort', () => {
    const expectedTestId = 'by-popular';
    const store = makeFakeStore();
    const { withStoreComponent } = withStore(
      withHistory(<CatalogSort />),
      store
    );

    render(withStoreComponent);

    const popularSort = screen.getByTestId(expectedTestId);

    fireEvent.click(popularSort, { target: { checked: true }});
    expect((popularSort as HTMLInputElement).checked).toEqual(true);
  });

  it('should change direction of sort', () => {
    const expectedTestId = 'down';
    const store = makeFakeStore();
    const { withStoreComponent } = withStore(
      withHistory(<CatalogSort />),
      store
    );

    render(withStoreComponent);

    const directionOfSort = screen.getByTestId(expectedTestId);

    fireEvent.click(directionOfSort, { target: { checked: true }});
    expect((directionOfSort as HTMLInputElement).checked).toEqual(true);
  });
});
