import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useScroll } from '../../../hooks/use-scroll';
import { useEffect } from 'react';
import { useAppSelector } from '../../../hooks';
import { getReviewsDataLoadingStatus } from '../../../store/review-data/selectors';
import Loader from '../../loader/loader';

type ReviewSuccessPopupProps = {
  onCloseClick: () => void;
}

export default function ReviewSuccessPopup({onCloseClick}: ReviewSuccessPopupProps): JSX.Element {
  const navigate = useNavigate();

  const { disableScroll, enableScroll } = useScroll();

  const isReviewsDataLoading = useAppSelector(getReviewsDataLoadingStatus);

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

  const handleBackToShopButtonClick = () => {
    onCloseClick();
    navigate(AppRoute.Catalog);
  };

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onCloseClick}></div>
        <div className="modal__content">
          {
            isReviewsDataLoading
              ? <Loader />
              :
              <>
                <p className="title title--h4">Спасибо за отзыв</p>
                <svg className="modal__icon" width="80" height="78" aria-hidden="true">
                  <use xlinkHref="#icon-review-success"></use>
                </svg>
                <div className="modal__buttons">
                  <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleBackToShopButtonClick}>Вернуться к покупкам
                  </button>
                </div>
                <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseClick} autoFocus>
                  <svg width="10" height="10" aria-hidden="true">
                    <use xlinkHref="#icon-close"></use>
                  </svg>
                </button>
              </>
          }
        </div>
      </div>
    </div>
  );
}
