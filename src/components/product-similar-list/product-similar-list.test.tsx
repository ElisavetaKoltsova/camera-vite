import { render, screen } from '@testing-library/react';
import { makeFakeCamera, makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import ProductSimilarList from './product-similar-list';

describe('Component: ProductSimilarList', () => {
  it('should render correctly', () => {
    const expectedTestId = 'product-similar-list';
    const mockFunction = vi.fn();

    const { withStoreComponent } = withStore(
      withHistory(
        <ProductSimilarList
          onClick={mockFunction}
          similarCameras={new Array(9).fill(null).map(() => makeFakeCamera())}
        />
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
