
export const PRICE_FROM = 0;
export const PRICE_TO = 1000000;

export const COUNT_OF_CAMERAS_ON_PAGE = 9;

export const MIN_COUNT_OF_CAMERAS = 1;
export const MAX_COUNT_OF_CAMERAS = 9;

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

export const byProductCountDiscounts = [
  { minCount: 0, maxCount: 1, discount: 0 },
  { minCount: 2, maxCount: 2, discount: 3 },
  { minCount: 3, maxCount: 5, discount: 5 },
  { minCount: 6, maxCount: 10, discount: 10 },
  { minCount: 11, maxCount: Infinity, discount: 15 },
];

export const byTotalPriceDiscounts = [
  { minPrice: 0, maxPrice: 9999, discount: 0 },
  { minPrice: 10000, maxPrice: 20000, discount: 1 },
  { minPrice: 20000, maxPrice: 30000, discount: 2 },
  { minPrice: 30000, maxPrice: Infinity, discount: 3 },
];

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
