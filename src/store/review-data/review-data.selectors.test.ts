import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { makeFakeReviews } from '../../utils/mock';
import { getReviews, getReviewsDataLoadingStatus } from './selectors';

describe('ReviewData selectors', () => {
  const COUNT_OF_REVIEWS = 10;

  const state: Pick<State, NameSpace.Review> = {
    [NameSpace.Review]: {
      reviews: makeFakeReviews(COUNT_OF_REVIEWS),
      isReviewsDataLoading: false
    }
  };

  it('should return reviews from state', () => {
    const { reviews } = state[NameSpace.Review];
    const result = getReviews(state);

    expect(result).toEqual(reviews);
  });

  it('should return isReviewsDataLoading from state', () => {
    const { isReviewsDataLoading } = state[NameSpace.Review];
    const result = getReviewsDataLoadingStatus(state);

    expect(result).toEqual(isReviewsDataLoading);
  });
});
