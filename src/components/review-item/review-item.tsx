import { Review } from '../../types/review';
import { formatDateToDayMonth, formatDateToYearMonthDay } from '../../utils/list';

type ReviewItemProps = {
  review: Review;
}

const stars = [1, 2, 3, 4, 5];

export default function ReviewItem({review}: ReviewItemProps): JSX.Element {
  const {
    userName,
    createAt,
    rating,
    advantage,
    disadvantage,
    review: comment
  } = review;

  const formattedDateTime = formatDateToYearMonthDay(createAt);
  const formattedDate = formatDateToDayMonth(createAt);

  return (
    <li className="review-card" data-testid="review-item">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={formattedDateTime}>{formattedDate}</time>
      </div>
      <div className="rate review-card__rate">
        {
          stars.map((star) => {
            const classOfStar = star <= rating ? '#icon-full-star' : '#icon-star';
            return (
              <svg width="17" height="16" aria-hidden="true" key={star}>
                <use xlinkHref={classOfStar}></use>
              </svg>
            );
          })
        }
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">
            {comment}
          </p>
        </li>
      </ul>
    </li>
  );
}
