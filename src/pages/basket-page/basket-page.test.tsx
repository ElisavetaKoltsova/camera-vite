import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mock';
import { withHistory, withScrollProvider, withStore } from '../../utils/mock-components';import BasketPage from './basket-page';

describe('Page: BasketPage', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.scrollTo = vi.fn(() => {});
  });

  it('should render correctly', () => {
    const expectedTestId = 'basket-page';
    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(
          <BasketPage />
        )
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
