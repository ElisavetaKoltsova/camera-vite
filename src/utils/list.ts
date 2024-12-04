import { Discount, months, PRICE_FROM, PRICE_TO } from '../const';
import { Camera } from '../types/camera';
import { Review } from '../types/review';

export const convertNumberIntoMoneyFormat = (value: number) => Math.round(value).toLocaleString('ru-RU');

export const formatDateToYearMonthDay = (oldDate: string) => {
  const date = new Date(oldDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatDateToDayMonth = (oldDate: string) => {
  const date = new Date(oldDate);

  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
};

export const navigateToUpOfPage = (behavior?: string) => {
  window.scrollTo({top: 0, behavior: behavior ? 'smooth' : 'auto'});
};

export const sortReviewsByDate = (reviewA: Review, reviewB: Review) =>
  new Date(reviewB.createAt).getTime() - new Date(reviewA.createAt).getTime();

export const sortByDescendingPrice = (cameraA: Camera, cameraB: Camera) =>
  cameraB.price - cameraA.price;

export const sortByAscendingPrice = (cameraA: Camera, cameraB: Camera) =>
  cameraA.price - cameraB.price;

export const sortByDescendingRating = (cameraA: Camera, cameraB: Camera) =>
  cameraB.rating - cameraA.rating;

export const sortByAscendingRating = (cameraA: Camera, cameraB: Camera) =>
  cameraA.rating - cameraB.rating;

export const findMinimalPrice = (cameras: Camera[]) => {
  let minimalPrice = PRICE_TO;

  if (cameras.length === 0) {
    minimalPrice = PRICE_FROM;
    return minimalPrice;
  }

  cameras.forEach((camera) => {
    if (minimalPrice >= camera.price) {
      minimalPrice = camera.price;
    }
  });

  return minimalPrice;
};

export const findMaximalPrice = (cameras: Camera[]) => {
  let maximalPrice = PRICE_FROM;

  if (cameras.length === 0) {
    maximalPrice = PRICE_FROM;
    return maximalPrice;
  }

  cameras.forEach((camera) => {
    if (maximalPrice <= camera.price) {
      maximalPrice = camera.price;
    }
  });

  return maximalPrice;
};

export const checkSearchQueryInCameras = (camera: Camera, searchQuery: string) => {
  const queries = searchQuery.split(' ');
  let successQuery = true;

  queries.map((query) => {
    successQuery = successQuery && camera.name.toUpperCase().includes(query.toUpperCase());
  });

  return successQuery;
};

export const calculateDiscount = (cameras: Camera[], totalPrice: number, couponDiscount: number) => {
  const numberOfCameras = cameras.length;
  let discount = 0;

  const {
    TWO_PRODUCT,
    THREE_FIVE_PRODUCT,
    SIX_TEN_PRODUCT,
    MORE_THEN_TEN_PRODUCT,
    UP_TO_TEN_THOUSAND,
    TEN_TO_TWO_THOUSAND,
    TWO_TO_THREE_THOUSAND,
    MORE_THAN_THREE_THOUSAND
  } = Discount;

  if (numberOfCameras === TWO_PRODUCT.productCount) {
    discount = TWO_PRODUCT.discount;
  }
  if (numberOfCameras > TWO_PRODUCT.productCount && numberOfCameras <= THREE_FIVE_PRODUCT.productCount) {
    discount = THREE_FIVE_PRODUCT.discount;
  }
  if (numberOfCameras > THREE_FIVE_PRODUCT.productCount && numberOfCameras <= SIX_TEN_PRODUCT.productCount) {
    discount = SIX_TEN_PRODUCT.discount;
  }
  if (numberOfCameras > SIX_TEN_PRODUCT.productCount) {
    discount = MORE_THEN_TEN_PRODUCT.discount;
  }

  if (couponDiscount) {
    discount += couponDiscount;
    return totalPrice * (100 - discount) / 100;
  }

  if (totalPrice > UP_TO_TEN_THOUSAND.totalPrice && totalPrice <= TEN_TO_TWO_THOUSAND.totalPrice) {
    if (discount > UP_TO_TEN_THOUSAND.discount) {
      discount -= TEN_TO_TWO_THOUSAND.discount;
    }
  }

  if (totalPrice > TEN_TO_TWO_THOUSAND.totalPrice && totalPrice <= TWO_TO_THREE_THOUSAND.totalPrice) {
    if (discount > TEN_TO_TWO_THOUSAND.discount) {
      discount -= TWO_TO_THREE_THOUSAND.discount;
    }
  }

  if (totalPrice > TWO_TO_THREE_THOUSAND.totalPrice) {
    if (discount > TWO_TO_THREE_THOUSAND.discount) {
      discount -= MORE_THAN_THREE_THOUSAND.discount;
    }
  }

  return totalPrice * (100 - discount) / 100;
};
