import { render, screen } from '@testing-library/react';
import { makeFakeReview, makeFakeStore } from '../../utils/mock';
import { withStore, withHistory, withScrollProvider } from '../../utils/mock-components';
import ReviewItem from './review-item';

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const expectedTestId = 'review-item';

    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(
          <ReviewItem review={makeFakeReview()} />
        )
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
