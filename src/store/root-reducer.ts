import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { productData } from './product-data/product-data';
import { reviewData } from './review-data/review-data';
import { popupProcess } from './popup-process/popup-process';

export const rootReducer = combineReducers({
  [NameSpace.Product]: productData.reducer,
  [NameSpace.Review]: reviewData.reducer,
  [NameSpace.Popup]: popupProcess.reducer
});
