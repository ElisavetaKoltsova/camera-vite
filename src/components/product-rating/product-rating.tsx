import React from 'react';

type ProductRatingProps = {
  rating: number;
  reviewCount: number;
}

const stars = [1, 2, 3, 4, 5];

export default function ProductRating({rating, reviewCount}: ProductRatingProps): JSX.Element {
  return (
    <React.Fragment>
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
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
    </React.Fragment>
  );
}
