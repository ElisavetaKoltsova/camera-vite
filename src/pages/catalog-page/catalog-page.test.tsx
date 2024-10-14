import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mock';
import { withHistory, withScrollProvider, withStore } from '../../utils/mock-components';
import CatalogPage from './catalog-page';

describe('Page: CatalogPage', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.scrollTo = vi.fn(() => {});
  });

  it('should render correctly', () => {
    const expectedTestId = 'catalog-page';
    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(
          <CatalogPage />
        )
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
