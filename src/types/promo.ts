import { CouponName } from '../const';

export type Promo = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
};

export type Coupon = {
  coupon: CouponName;
}
