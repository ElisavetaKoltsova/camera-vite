import { Link } from 'react-router-dom';
import { Promo } from '../../types/promo';
import React from 'react';
import { AppRoute } from '../../const';


type BannerItemProps ={
  promo: Promo;
}

export default function BannerItem({promo}: BannerItemProps): JSX.Element {
  const {
    id,
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x
  } = promo;

  return (
    <React.Fragment>
      <picture>
        <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`} />
        <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`}width="1280" height="280" alt={name} />
      </picture>
      <p className="banner__info">
        <span className="banner__message">
          Новинка!
        </span>
        <span className="title title--h1">{name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`${AppRoute.Product}/${id}`}>Подробнее</Link>
      </p>
    </React.Fragment>
  );
}
