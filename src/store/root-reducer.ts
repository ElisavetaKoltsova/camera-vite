import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { productData } from './product-data/product-data';
import { reviewData } from './review-data/review-data';
import { popupProcess } from './popup-process/popup-process';
import { promoData } from './promo-data/promo-data';
import { errorProcess } from './error-process/error-process';
import { orderData } from './order-data/order-data';

export const rootReducer = combineReducers({
  [NameSpace.Product]: productData.reducer,
  [NameSpace.Review]: reviewData.reducer,
  [NameSpace.Popup]: popupProcess.reducer,
  [NameSpace.Promo]: promoData.reducer,
  [NameSpace.Error]: errorProcess.reducer,
  [NameSpace.Order]: orderData.reducer
});
