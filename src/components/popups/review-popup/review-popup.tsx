import { useEffect, useState } from 'react';
import { useScroll } from '../../../hooks/use-scroll';
import { ReviewError, ReviewRating } from '../../../const';
import { useAppDispatch } from '../../../hooks';
import { ReviewToPost } from '../../../types/review';
import { SubmitHandler, useForm } from 'react-hook-form';
import React from 'react';
import { postReviewAction } from '../../../store/api-action';

type ReviewPopupProps = {
  cameraId: number;
  onCloseClick: () => void;
  onSubmitClick: () => void;
}

const Rating = {
  MIN: 1,
  MAX: 5
};
const Name = {
  MIN: 2,
  MAX: 15
};
const Input = {
  MIN: 10,
  MAX: 160
};
const DEFAULT_RATING_VALUE = 0;

export default function ReviewPopup({onCloseClick, cameraId, onSubmitClick}: ReviewPopupProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { disableScroll, enableScroll } = useScroll();
  const { register, handleSubmit, formState: {errors} } = useForm<ReviewToPost>();
  const [ratingValue, setRatingValue] = useState<number>(DEFAULT_RATING_VALUE);

  useEffect(() => {
    const handleEscKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseClick();
      }
    };

    document.addEventListener('keydown', handleEscKeyDown);

    disableScroll();
    return () => {
      enableScroll();
      document.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [disableScroll, enableScroll, onCloseClick]);

  const onSubmit: SubmitHandler<ReviewToPost> = (data) => {
    const {
      userName,
      advantage,
      disadvantage,
      review: dataReview,
      rating
    } = data;

    const review: ReviewToPost = {
      cameraId: cameraId,
      userName: userName,
      advantage: advantage,
      disadvantage: disadvantage,
      review: dataReview,
      rating: Number(rating)
    };

    dispatch(postReviewAction(review));

    onSubmitClick();
  };

  const handleRatingInputClick = (key: string) => {
    setRatingValue(Number(key));
  };

  const checkCorrectnessOfRating = (value: number) => {
    const isRatingValid = value >= Rating.MIN && value <= Rating.MAX;
    return isRatingValid ? isRatingValid : ReviewError.RATING;
  };

  const checkCorrectnessOfUserName = (value: string) => {
    if (value.length > 0) {
      const isUserNameValid = value.length >= Name.MIN && value.length <= Name.MAX;
      return isUserNameValid ? isUserNameValid : `Имя должно быть от ${Name.MIN} до ${Name.MAX} символов`;
    }
  };

  const checkCorrectnessOfBigInput = (value: string) => {
    if (value.length > 0) {
      const isInputValid = value.length >= Input.MIN && value.length <= Input.MAX;
      return isInputValid ? isInputValid : `От ${Input.MIN} до ${Input.MAX} символов`;
    }
  };

  // const checkInputValue = (value: string) => {
  //   if (value.length > 0) {
  //     const isInputValid = value.length >= Input.MIN && value.length <= Input.MAX;
  //     return isInputValid ? isInputValid : `От ${Input.MIN} до ${Input.MAX} символов`;
  //   }
  // };

  // const checkCorrectnessOfAdvantage = (value: string) => checkInputValue(value);
  // const checkCorrectnessOfDisadvantage = (value: string) => checkInputValue(value);
  // const checkCorrectnessOfReview = (value: string) => checkInputValue(value);

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onCloseClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-review__rate">
                <fieldset
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  className={`rate form-review__item ${errors.rating && 'is-invalid'}`}
                >
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      {
                        Object.entries(ReviewRating).map(([key, value]) => (
                          <React.Fragment key={key + value}>
                            <input
                              className="visually-hidden"
                              id={`star-${key}`}
                              type="radio"
                              value={key}
                              {...register('rating', {
                                validate: checkCorrectnessOfRating
                              })}
                            />
                            <label
                              className="rate__label"
                              htmlFor={`star-${key}`}
                              title={value}
                              onClick={() => handleRatingInputClick(key)}
                            >
                            </label>
                          </React.Fragment>
                        )).reverse()
                      }
                    </div>
                    <div className="rate__progress"><span className="rate__stars">{ratingValue}</span> <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  {errors.rating && <p className="rate__message">{errors.rating.message}</p>}
                </fieldset>
                <div
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  className={`custom-input form-review__item ${errors.userName && 'is-invalid'}`}
                >
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Введите ваше имя"
                      autoFocus
                      {...register('userName', {
                        required: {value: true, message: ReviewError.NAME},
                        validate: checkCorrectnessOfUserName
                      })}
                    />
                  </label>
                  {errors.userName && <p className="custom-input__error">{errors.userName.message}</p>}
                </div>
                <div
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  className={`custom-input form-review__item ${errors.advantage && 'is-invalid'}`}
                >
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Основные преимущества товара"
                      {...register('advantage', {
                        required: {value: true, message: ReviewError.ADVANTAGE},
                        validate: checkCorrectnessOfBigInput
                      })}
                    />
                  </label>
                  {errors.advantage && <p className="custom-input__error">{errors.advantage.message}</p>}
                </div>
                <div
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  className={`custom-input form-review__item ${errors.disadvantage && 'is-invalid'}`}
                >
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Главные недостатки товара"
                      {...register('disadvantage', {
                        required: {value: true, message: 'Это обязательное поле'},
                        validate: checkCorrectnessOfBigInput
                      })}
                    />
                  </label>
                  {errors.disadvantage && <p className="custom-input__error">{errors.disadvantage.message}</p>}
                </div>
                <div
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  className={`custom-textarea form-review__item ${errors.review && 'is-invalid'}`}
                >
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea
                      placeholder="Поделитесь своим опытом покупки"
                      {...register('review', {
                        required: {value: true, message: ReviewError.REVIEW},
                        validate: checkCorrectnessOfBigInput
                      })}
                    >
                    </textarea>
                  </label>
                  {errors.review && <div className="custom-textarea__error">{errors.review?.message}</div>}
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
            </form>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseClick}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
