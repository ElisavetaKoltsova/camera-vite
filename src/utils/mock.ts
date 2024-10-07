import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { Promo } from '../types/promo';
import { datatype, internet, name } from 'faker';
import { Camera } from '../types/camera';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakePromo = (): Promo => ({
  id: datatype.number(),
  name: name.firstName(),
  previewImg: internet.avatar(),
  previewImg2x: internet.avatar(),
  previewImgWebp: internet.avatar(),
  previewImgWebp2x: internet.avatar()
});

export const makeFakeCamera = (): Camera => ({
  id: datatype.number(),
  name: name.findName(),
  vendorCode: name.title(),
  type: 'Коллекционная',
  category: 'Видеокамера',
  description: name.title(),
  level: 'Нулевой',
  price: datatype.number(),
  rating: datatype.number(),
  reviewCount: datatype.number(),
  previewImg: internet.avatar(),
  previewImg2x: internet.avatar(),
  previewImgWebp: internet.avatar(),
  previewImgWebp2x: internet.avatar()
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  PRODUCT: {
    cameras: [],
    currentCamera: makeFakeCamera(),
    similarCameras: [],
    camerasInBasket: [],
    isCamerasDataLoading: false
  },
  PROMO: {
    promos: [],
    couponDiscount: 0,
    isCouponDiscountDataLoading: false
  },
  POPUP: {
    isCallItemPopupOpen: false,
    isAddItemPopupOpen: false,
    isAddItemSuccessPopupOpen: false,
    isReviewPopupOpen: false,
    isReviewSuccessPopupOpen: false,
    isRemoveItemPopupOpen: false,
    isOrderSuccessPopupOpen: false
  },
  REVIEW: {
    reviews: [],
    isReviewsDataLoading: false
  },
  ...initialState ?? {}
});
