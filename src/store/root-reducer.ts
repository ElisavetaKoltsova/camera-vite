import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { productData } from './product-data/product-data';

export const rootReducer = combineReducers({
  [NameSpace.Product]: productData.reducer
});
