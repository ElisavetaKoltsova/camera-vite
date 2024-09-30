import { Promo } from '../../types/promo';

type BannerItemProps ={
  promo: Promo;
}

export default function BannerItem({promo}: BannerItemProps): JSX.Element {
  const {
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x
  } = promo;

  return (
    <div className="banner swiper-slide">
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
        <a className="btn" href="#">Подробнее</a>
      </p>
    </div>
  );
}
