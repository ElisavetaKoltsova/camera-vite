import { months, PRICE_FROM, PRICE_TO } from '../const';
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
    maximalPrice = PRICE_TO;
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
