import { useAppSelector } from '../../hooks';
import { getPromos } from '../../store/promo-data/selectors';
import BannerItem from '../banner-item/banner-item';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './banner.css';

const SLIDE_SWIPE_TIMEOUT = 3000;

export default function Banner(): JSX.Element {
  const promos = useAppSelector(getPromos);

  return (
    <div className="banner" data-testid="banner">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true, el: '.swiper-pagination' }}
        autoplay={{ delay: SLIDE_SWIPE_TIMEOUT, disableOnInteraction: false }}
      >
        {
          promos.map((promo) => <SwiperSlide key={promo.name + promo.previewImg}><BannerItem promo={promo} /></SwiperSlide>)
        }
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
}
