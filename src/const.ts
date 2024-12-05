
export const PRICE_FROM = 0;
export const PRICE_TO = 1000000;

export const COUNT_OF_CAMERAS_ON_PAGE = 9;

export const months = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export const ReviewError = {
  RATING: 'Нужно оценить товар',
  NAME: 'Нужно указать имя',
  ADVANTAGE: 'Нужно указать достоинства',
  DISADVANTAGE: 'Нужно указать недостатки',
  REVIEW: 'Нужно добавить комментарий'
};

export const Sorts = {
  POPULAR_LOW_TO_HIGH: 'sortPopular up',
  POPULAR_HIGH_TO_LOW: 'sortPopular down',
  PRICE_LOW_TO_HIGH: 'sortPrice up',
  PRICE_HIGH_TO_LOW: 'sortPrice down'
};

export const SortType = {
  PRICE: 'sortPrice',
  POPULAR: 'sortPopular'
};

export const SortOrder = {
  UP: 'up',
  DOWN: 'down'
};

export const ReviewRating = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично'
};

export const Discount = {
  TWO_PRODUCT: { productCount: 2, discount: 3 },
  THREE_FIVE_PRODUCT: { productCount: 5, discount: 5 },
  SIX_TEN_PRODUCT: { productCount: 10, discount: 10 },
  MORE_THEN_TEN_PRODUCT: { discount: 15 },
  UP_TO_TEN_THOUSAND: { totalPrice: 10000, discount: 0 },
  TEN_TO_TWO_THOUSAND: { totalPrice: 20000, discount: 1 },
  TWO_TO_THREE_THOUSAND: { totalPrice: 30000, discount: 2 },
  MORE_THAN_THREE_THOUSAND: { discount: 3 }
};

export enum LocalStorageName {
  CamerasInBasket = 'CamerasInBasket'
}

export enum Tab {
  Characteristics ='Характеристики',
  Description = 'Описание'
}

export enum CameraFilterPrice {
  From = 'price',
  To = 'priceUp'
}

export enum CameraCategory {
  photocamera = 'Фотокамера',
  videocamera = 'Видеокамера'
}

export enum CameraType {
  digital = 'Цифровая',
  film = 'Плёночная',
  snapshot = 'Моментальная',
  collection = 'Коллекционная'
}

export enum CameraLevel {
  Нулевой = 'zero',
  Любительский = 'non-professional',
  Профессиональный = 'professional'
}

export enum CouponName {
  Coupon333 = 'camera-333',
  Coupon444 = 'camera-444',
  Coupon555 = 'camera-555'
}

export enum AppRoute {
  Catalog = '/',
  Product = '/cameras',
  ProductId = ':id',
  Basket = '/card',
}

export enum URLParam {
  Page = 'page',
  Sort = 'sort',
  PriceFrom = 'priceFrom',
  PriceTo = 'priceTo',
  FilterOfCategory = 'filterOfCategory',
  FilterOfTypes = 'filterOfTypes',
  FilterOfLevels = 'filterOfLevels',
  TabControl = 'tabControl'
}

export enum APIRoute {
  Cameras = '/cameras',
  Reviews = '/reviews',
  Promo = '/promo',
  Coupon = '/coupons',
  Orders = '/orders',
  Similar = '/similar'
}

export enum NameSpace {
  Product = 'PRODUCT',
  Review = 'REVIEW',
  Popup = 'POPUP',
  Promo = 'PROMO',
  Error = 'ERROR',
  Order = 'ORDER'
}
