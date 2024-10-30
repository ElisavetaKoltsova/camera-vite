import { Sorts } from '../const';
import { Camera } from '../types/camera';
import { sortByAscendingPrice, sortByAscendingRating, sortByDescendingPrice, sortByDescendingRating } from './list';

export const sort = {
  [Sorts.PRICE_LOW_TO_HIGH]: (cameras: Camera[]) => cameras.sort(sortByAscendingPrice),
  [Sorts.PRICE_HIGH_TO_LOW]: (cameras: Camera[]) => cameras.sort(sortByDescendingPrice),
  [Sorts.POPULAR_LOW_TO_HIGH]: (cameras: Camera[]) => cameras.sort(sortByAscendingRating),
  [Sorts.POPULAR_HIGH_TO_LOW]: (cameras: Camera[]) => cameras.sort(sortByDescendingRating)
};
