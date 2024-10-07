import { render, screen } from '@testing-library/react';
import ProductRating from './product-rating';

describe('Component: ProductRating', () => {
  it('should render correctly', () => {
    const expectedTestId = 'product-rating';
    const testRatingCount = 3;
    const testReviewCount = 10;

    render(
      <ProductRating
        rating={testRatingCount}
        reviewCount={testReviewCount}
      />
    );

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
