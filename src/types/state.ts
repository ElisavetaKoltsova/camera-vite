import { CameraCategory, CameraLevel, CameraType } from '../const';
import { store } from '../store';
import { Camera } from './camera';
import { Promo } from './promo';
import { Review } from './review';

export type ProductData = {
  cameras: Camera[];
  filteredCameras: Camera[];
  currentCamera: Camera | null;
  similarCameras: Camera[];
  camerasInBasket: Camera[];
  isCamerasDataLoading: boolean;
  sort: string;
  priceFrom: number;
  priceTo: number;
  filterOfCategory: CameraCategory | null;
  filterOfTypes: CameraType[];
  filterOfLevels: CameraLevel[];
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
  isOrderErrorPopupOpen: boolean;
}

export type PromoData = {
  promos: Promo[];
  coupon: string | null;
  couponDiscount: number;
  isCouponDiscountDataLoading: boolean;
  isPromoDataLoading: boolean;
}

export type ErrorProcess = {
  errorMessage: string | null;
}

export type OrderData = {
  isOrderDataLoading: boolean;
  isErrorPostOrder: boolean;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
