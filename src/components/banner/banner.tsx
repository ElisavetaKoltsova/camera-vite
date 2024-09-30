import { useAppSelector } from '../../hooks';
import { getPromos } from '../../store/promo-data/selectors';
import BannerItem from '../banner-item/banner-item';

export default function Banner(): JSX.Element {
  const promos = useAppSelector(getPromos);

  return (
    <div className="swiper-wrapper">
      {
        promos.map((promo) => <BannerItem promo={promo} key={promo.name + promo.previewImg}/>)
      }
    </div>
  );
}
