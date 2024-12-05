import { useEffect, useState } from 'react';
import { Review } from '../../types/review';
import ReviewItem from '../review-item/review-item';

type ReviewListProps = {
  reviews: Review[];
  onLeaveReviewClick: () => void;
}

const SCROLL_TO_UP_VALUE = 100;
const START_NUMBER_REVIEW = 0;

export default function ReviewList({reviews, onLeaveReviewClick}: ReviewListProps): JSX.Element {
  const [visibleReviews, setVisibleReviews] = useState<number>(3);

  const handleShowMoreReviewsButtonClick = () => {
    setVisibleReviews((prevCount) => prevCount + 3);
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - SCROLL_TO_UP_VALUE) {
      handleShowMoreReviewsButtonClick();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countReviews = visibleReviews <= reviews.length ? visibleReviews : reviews.length;

  return (
    <section className="review-block" onScroll={handleScroll} data-testid="review-list">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button" onClick={onLeaveReviewClick}>Оставить свой отзыв</button>
        </div>
        <ul className="review-block__list">
          {reviews.slice(START_NUMBER_REVIEW, countReviews).map((review) => <ReviewItem review={review} key={review.id}/>)}
        </ul>
        <div className="review-block__buttons">
          <button
            className={`btn btn--purple ${countReviews >= reviews.length ? 'visually-hidden' : ''}`}
            type="button"
            onClick={handleShowMoreReviewsButtonClick}
          >
            Показать больше отзывов
          </button>
        </div>
      </div>
    </section>
  );
}
