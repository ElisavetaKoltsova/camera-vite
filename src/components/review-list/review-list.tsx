import { useState } from 'react';
import { Review } from '../../types/review';
import ReviewItem from '../review-item/review-item';

type ReviewListProps = {
  reviews: Review[];
}

export default function ReviewList({reviews}: ReviewListProps): JSX.Element {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const handleShowMoreReviewsButtonClick = () => {
    setVisibleReviews((prevCount) => prevCount + 3);
  };

  const countReviews = visibleReviews <= reviews.length ? visibleReviews : reviews.length;

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          {/* <button className="btn" type="button" onClick={handlePopupButtonOpenToggleClick}>Оставить свой отзыв</button> */}
        </div>
        <ul className="review-block__list">
          {reviews.slice(0, countReviews).map((review) => <ReviewItem review={review} key={review.id}/>)}
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
