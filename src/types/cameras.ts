
export type Type = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';
export type Category = 'Видеокамера' | 'Фотоаппарат';
export type Level = 'Нулевой' | 'Любительский' | 'Профессиональный';

export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: Type;
  category: Category;
  description: string;
  level: Level;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}
