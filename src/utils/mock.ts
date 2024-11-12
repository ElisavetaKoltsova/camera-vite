import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { Promo } from '../types/promo';
import { datatype, internet, name } from 'faker';
import { Camera } from '../types/camera';
import { Review } from '../types/review';
import { CameraCategory, CameraLevel, CameraType, PRICE_FROM, PRICE_TO, Sorts } from '../const';

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
  type: CameraType.collection,
  category: CameraCategory.photocamera,
  description: name.title(),
  level: CameraLevel.Нулевой,
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
    cameras: [
      {
        id: 0,
        name: 'Camera1',
        vendorCode: '',
        type: CameraType.digital,
        category: 'Фотоаппарат',
        description: '',
        level: 'Нулевой',
        price: 4990,
        rating: 5,
        reviewCount: 0,
        previewImg: '',
        previewImg2x: '',
        previewImgWebp: '',
        previewImgWebp2x: ''
      },
      {
        id: 1,
        name: 'Camera2',
        vendorCode: '',
        type: CameraType.film,
        category: 'Фотоаппарат',
        description: '',
        level: 'Профессиональный',
        price: 8990,
        rating: 1,
        reviewCount: 0,
        previewImg: '',
        previewImg2x: '',
        previewImgWebp: '',
        previewImgWebp2x: ''
      },
      {
        id: 2,
        name: 'Camera3',
        vendorCode: '',
        type: CameraType.collection,
        category: CameraCategory.videocamera,
        description: '',
        level: 'Любительский',
        price: 10990,
        rating: 3,
        reviewCount: 0,
        previewImg: '',
        previewImg2x: '',
        previewImgWebp: '',
        previewImgWebp2x: ''
      }
    ],
    currentCamera: makeFakeCamera(),
    similarCameras: [],
    camerasInBasket: [],
    isCamerasDataLoading: false,
    filteredCameras: [],
    sort: Sorts.PRICE_LOW_TO_HIGH,
    priceFrom: PRICE_FROM,
    priceTo: PRICE_TO,
    filterOfCategory: null,
    filterOfTypes: [],
    filterOfLevels: []
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
