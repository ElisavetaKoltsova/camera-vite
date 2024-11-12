import { render, screen } from '@testing-library/react';
import { makeFakeReviews, makeFakeStore } from '../../utils/mock';
import { withStore, withHistory, withScrollProvider } from '../../utils/mock-components';
import ReviewList from './review-list';

describe('Component: ReviewItem', () => {
  const COUNT_OF_REVIEWS = 10;

  it('should render correctly', () => {
    const expectedTestId = 'review-list';

    const { withStoreComponent } = withStore(
      withHistory(
        withScrollProvider(
          <ReviewList reviews={makeFakeReviews(COUNT_OF_REVIEWS)}/>
        )
      ),
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
