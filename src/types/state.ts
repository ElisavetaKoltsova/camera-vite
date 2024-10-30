import { store } from '../store';
import { Camera } from './camera';
import { Promo } from './promo';
import { Review } from './review';

export type ProductData = {
  cameras: Camera[];
  currentCamera: Camera | null;
  similarCameras: Camera[];
  camerasInBasket: Camera[];
  isCamerasDataLoading: boolean;
  sort: string;
};

export type ReviewData = {
  reviews: Review[];
  isReviewsDataLoading: boolean;
}

export type PopupProcess = {
  isCallItemPopupOpen: boolean;
  isAddItemPopupOpen: boolean;
  isAddItemSuccessPopupOpen: boolean;
  isReviewPopupOpen: boolean;
  isReviewSuccessPopupOpen: boolean;
  isRemoveItemPopupOpen: boolean;
  isOrderSuccessPopupOpen: boolean;
}

export type PromoData = {
  promos: Promo[];
  couponDiscount: number;
  isCouponDiscountDataLoading: boolean;
}

export type ErrorProcess = {
  errorMessage: string | null;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
