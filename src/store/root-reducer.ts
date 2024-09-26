import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { productData } from './product-data/product-data';
import { reviewData } from './review-data/review-data';

export const rootReducer = combineReducers({
  [NameSpace.Product]: productData.reducer,
  [NameSpace.Review]: reviewData.reducer
});
