import { CameraCategory, CameraLevel, CameraType } from '../const';

export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: CameraType;
  category: CameraCategory | 'Фотоаппарат';
  description: string;
  level: CameraLevel | 'Нулевой' | 'Любительский' | 'Профессиональный';
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  countInBasket?: number;
}
