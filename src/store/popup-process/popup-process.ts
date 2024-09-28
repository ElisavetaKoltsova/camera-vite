import { createSlice } from '@reduxjs/toolkit';
import { PopupProcess } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: PopupProcess = {
  isCallItemPopupOpen: false,
  isAddItemPopupOpen: false,
  isAddItemSuccessPopupOpen: false,
  isReviewPopupOpen: false,
  isReviewSuccessPopupOpen: false,
  isReviewErrorPopupOpen: false,
  isRemoveItemPopupOpen: false,
  isOrderSuccessPopupOpen: false
};

export const popupProcess = createSlice({
  name: NameSpace.Popup,
  initialState,
  reducers: {
    toggleCallItemPopupOpenStatus(state) {
      state.isCallItemPopupOpen = !state.isCallItemPopupOpen;

      state.isAddItemPopupOpen = false;
      state.isAddItemSuccessPopupOpen = false;
      state.isRemoveItemPopupOpen = false;
      state.isOrderSuccessPopupOpen = false;
      state.isReviewErrorPopupOpen = false;
      state.isReviewSuccessPopupOpen = false;
      state.isReviewPopupOpen = false;
    },
    toggleAddItemPopupOpenStatus(state) {
      state.isAddItemPopupOpen = !state.isAddItemPopupOpen;

      state.isCallItemPopupOpen = false;
      state.isAddItemSuccessPopupOpen = false;
      state.isRemoveItemPopupOpen = false;
      state.isOrderSuccessPopupOpen = false;
      state.isReviewErrorPopupOpen = false;
      state.isReviewSuccessPopupOpen = false;
      state.isReviewPopupOpen = false;
    },
    toggleAddItemSuccessPopupOpenStatus(state) {
      state.isAddItemSuccessPopupOpen = !state.isAddItemSuccessPopupOpen;

      state.isCallItemPopupOpen = false;
      state.isAddItemPopupOpen = false;
      state.isRemoveItemPopupOpen = false;
      state.isOrderSuccessPopupOpen = false;
      state.isReviewErrorPopupOpen = false;
      state.isReviewSuccessPopupOpen = false;
      state.isReviewPopupOpen = false;
    },
    toggleRemoveItemPopupOpenStatus(state) {
      state.isRemoveItemPopupOpen = !state.isRemoveItemPopupOpen;

      state.isCallItemPopupOpen = false;
      state.isAddItemPopupOpen = false;
      state.isAddItemSuccessPopupOpen = false;
      state.isOrderSuccessPopupOpen = false;
      state.isReviewErrorPopupOpen = false;
      state.isReviewSuccessPopupOpen = false;
      state.isReviewPopupOpen = false;
    },
    toggleOrderSuccessPopupOpen(state) {
      state.isOrderSuccessPopupOpen = !state.isOrderSuccessPopupOpen;

      state.isCallItemPopupOpen = false;
      state.isAddItemPopupOpen = false;
      state.isAddItemSuccessPopupOpen = false;
      state.isRemoveItemPopupOpen = false;
      state.isReviewErrorPopupOpen = false;
      state.isReviewSuccessPopupOpen = false;
      state.isReviewPopupOpen = false;
    }
  }
});

export const {
  toggleAddItemPopupOpenStatus,
  toggleAddItemSuccessPopupOpenStatus,
  toggleCallItemPopupOpenStatus,
  toggleRemoveItemPopupOpenStatus,
  toggleOrderSuccessPopupOpen
} = popupProcess.actions;
