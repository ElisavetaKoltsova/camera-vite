import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { Promo } from '../types/promo';
import { datatype, internet, name } from 'faker';
import { Camera } from '../types/camera';
import { Review } from '../types/review';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

export const makeFakePromo = (): Promo => ({
  id: datatype.number(),
  name: name.firstName(),
  previewImg: internet.avatar(),
  previewImg2x: internet.avatar(),
  previewImgWebp: internet.avatar(),
  previewImgWebp2x: internet.avatar()
});

export const makeFakeReview = (): Review => ({
  id: name.title(),
  createAt: String(new Date()),
  cameraId: datatype.number(),
  userName: name.firstName(),
  advantage: name.title(),
  disadvantage: name.title(),
  review: name.title(),
  rating: datatype.number()
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

export const makeFakeCameras =
  (countOfElements: number): Camera[] =>
    new Array(countOfElements).fill(null).map(() => makeFakeCamera());

export const makeFakePromos =
  (countOfElements: number): Promo[] =>
    new Array(countOfElements).fill(null).map(() => makeFakePromo());

export const makeFakeReviews =
  (countOfElements: number): Review[] =>
    new Array(countOfElements).fill(null).map(() => makeFakeReview());

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
  ERROR: {
    errorMessage: 'Some error'
  },
  ...initialState ?? {}
});
