import { sortReviewsByDate } from '../../utils/list';
import { makeFakeReview, makeFakeReviews } from '../../utils/mock';
import { fetchReviewsAction, postReviewAction } from '../api-action';
import { reviewData } from './review-data';

describe('ReviewData Slice', () => {
  const COUNT_OF_REVIEWS = 10;

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: makeFakeReviews(COUNT_OF_REVIEWS),
      isReviewsDataLoading: false
    };

    const result = reviewData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
      isReviewsDataLoading: false
    };

    const result = reviewData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewsDataLoading" to "true" with "fetchReviewsAction.pending"', () => {
    const expectedState = {
      reviews: [],
      isReviewsDataLoading: true
    };

    const result = reviewData.reducer(undefined, fetchReviewsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to array with reviews, "isCamerasDataLoading" to "false" with "fetchReviewsAction.fulfilled"', () => {
    const mockReviews = makeFakeReviews(COUNT_OF_REVIEWS);
    const expectedState = {
      reviews: [...mockReviews],
      isReviewsDataLoading: false
    };

    const result = reviewData.reducer(undefined, fetchReviewsAction.fulfilled(mockReviews, '', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewsDataLoading" to "true" with "postReviewAction.pending"', () => {
    const expectedState = {
      reviews: [],
      isReviewsDataLoading: true
    };

    const result = reviewData.reducer(undefined, postReviewAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewsDataLoading" to "false" with "postReviewAction.fulfilled"', () => {
    const fakeReviews = makeFakeReviews(3);
    const fakeReview = makeFakeReview();

    fakeReviews.push(fakeReview);

    const expectedState = {
      reviews: [...fakeReviews].sort(sortReviewsByDate),
      isReviewsDataLoading: false
    };

    const resultReview = reviewData.reducer(undefined, postReviewAction.fulfilled(fakeReview, '', fakeReview));
    const result = expectedState.reviews.includes(resultReview.reviews[0]);

    expect(result).toEqual(true);
  });
});
