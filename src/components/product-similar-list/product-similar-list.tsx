import CatalogCardItem from '../catalog-card-item/catalog-card-item';
import { Camera } from '../../types/camera';
import { useState } from 'react';

type ProductSimilarListProps = {
  similarCameras: Camera[];
  onClick: (id: number) => void;
}

export default function ProductSimilarList({onClick, similarCameras}: ProductSimilarListProps): JSX.Element {
  const slidesToShow = 3;
  const [currentSlide, setCurrentSlide] = useState<number>(slidesToShow);

  const handleNextSlideButtonMouseDown = () => {
    setCurrentSlide(currentSlide + slidesToShow);
  };

  const handlePrevSlideButtonMouseDown = () => {
    setCurrentSlide(currentSlide - slidesToShow);
  };

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title&#45;&#45;h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {
              similarCameras.slice(currentSlide - slidesToShow, currentSlide).map((camera) =>
                (
                  <CatalogCardItem
                    key={camera.id + camera.price}
                    onClick={onClick}
                    camera={camera}
                    isActiveClass='is-active'
                  />)
              )
            }
          </div>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            onMouseDown={handlePrevSlideButtonMouseDown}
            disabled={currentSlide === 3}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            onMouseDown={handleNextSlideButtonMouseDown}
            disabled={currentSlide >= similarCameras.length}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
