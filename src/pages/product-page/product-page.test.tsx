import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mock';
import { withHistory, withScrollProvider, withStore } from '../../utils/mock-components';
import ProductPage from './product-page';

describe('Page: ProductPage', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.scrollTo = vi.fn(() => {});
  });

  it('should render correctly', () => {
    const expectedTestId = 'product-page';
    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(
          <ProductPage />
        )
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
