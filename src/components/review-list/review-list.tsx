import { Review } from '../../types/review';
import ReviewItem from '../review-item/review-item';

type ReviewListProps = {
  reviews: Review[];
}

export default function ReviewList({reviews}: ReviewListProps): JSX.Element {
  return (
    <ul className="review-block__list">
      {reviews.map((review) => <ReviewItem review={review} key={review.id}/>)}
    </ul>
  );
}