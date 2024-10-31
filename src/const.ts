export const months = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

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
  Basket = '/basket'
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
  Error = 'ERROR'
}
