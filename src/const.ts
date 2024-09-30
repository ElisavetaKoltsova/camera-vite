export const months = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export enum AppRoute {
  Catalog = '/',
  Product = '/cameras',
  ProductId = ':id',
  Basket = '/basket'
}

export enum APIRoute {
  Cameras = '/cameras',
  Reviews = '/reviews',
  Promo = '/promo'
}

export enum NameSpace {
  Product = 'PRODUCT',
  Review = 'REVIEW',
  Popup = 'POPUP',
  Promo = 'PROMO'
}
