import { reviews } from '../../mock/reviews';
import ReviewItem from '../review-item/review-item';

export default function ReviewList(): JSX.Element {
  return (
    <ul className="review-block__list">
      {reviews.map((review) => <ReviewItem review={review} key={review.id}/>)}
    </ul>
  );
}
