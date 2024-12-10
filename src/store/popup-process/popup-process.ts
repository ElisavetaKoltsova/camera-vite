import { createSlice } from '@reduxjs/toolkit';
import { PopupProcess } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: PopupProcess = {
  isCallItemPopupOpen: false,
  isAddItemPopupOpen: false,
  isAddItemSuccessPopupOpen: false,
  isReviewPopupOpen: false,
  isReviewSuccessPopupOpen: false,
  isRemoveItemPopupOpen: false,
  isOrderSuccessPopupOpen: false,
  isOrderErrorPopupOpen: false
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
      state.isReviewSuccessPopupOpen = false;
      state.isReviewPopupOpen = false;
      state.isOrderErrorPopupOpen = false;
    },
    toggleAddItemPopupOpenStatus(state) {
      state.isAddItemPopupOpen = !state.isAddItemPopupOpen;

      state.isCallItemPopupOpen = false;
      state.isAddItemSuccessPopupOpen = false;
      state.isRemoveItemPopupOpen = false;
      state.isOrderSuccessPopupOpen = false;
      state.isReviewSuccessPopupOpen = false;
      state.isReviewPopupOpen = false;
      state.isOrderErrorPopupOpen = false;
    },
    toggleAddItemSuccessPopupOpenStatus(state) {
      state.isAddItemSuccessPopupOpen = !state.isAddItemSuccessPopupOpen;

      state.isCallItemPopupOpen = false;
      state.isAddItemPopupOpen = false;
      state.isRemoveItemPopupOpen = false;
      state.isOrderSuccessPopupOpen = false;
      state.isReviewSuccessPopupOpen = false;
      state.isReviewPopupOpen = false;
      state.isOrderErrorPopupOpen = false;
    },
    toggleRemoveItemPopupOpenStatus(state) {
      state.isRemoveItemPopupOpen = !state.isRemoveItemPopupOpen;

      state.isCallItemPopupOpen = false;
      state.isAddItemPopupOpen = false;
      state.isAddItemSuccessPopupOpen = false;
      state.isOrderSuccessPopupOpen = false;
      state.isReviewSuccessPopupOpen = false;
      state.isReviewPopupOpen = false;
      state.isOrderErrorPopupOpen = false;
    },
    toggleOrderSuccessPopupOpen(state) {
      state.isOrderSuccessPopupOpen = !state.isOrderSuccessPopupOpen;

      state.isCallItemPopupOpen = false;
      state.isAddItemPopupOpen = false;
      state.isAddItemSuccessPopupOpen = false;
      state.isRemoveItemPopupOpen = false;
      state.isReviewSuccessPopupOpen = false;
      state.isReviewPopupOpen = false;
      state.isOrderErrorPopupOpen = false;
    },
    toggleReviewPopupOpen(state) {
      state.isReviewPopupOpen = !state.isReviewPopupOpen;

      state.isCallItemPopupOpen = false;
      state.isAddItemPopupOpen = false;
      state.isAddItemSuccessPopupOpen = false;
      state.isRemoveItemPopupOpen = false;
      state.isReviewSuccessPopupOpen = false;
      state.isOrderSuccessPopupOpen = false;
      state.isOrderErrorPopupOpen = false;
    },
    toggleReviewSuccessPopupOpen(state) {
      state.isReviewSuccessPopupOpen = !state.isReviewSuccessPopupOpen;

      state.isCallItemPopupOpen = false;
      state.isAddItemPopupOpen = false;
      state.isAddItemSuccessPopupOpen = false;
      state.isRemoveItemPopupOpen = false;
      state.isReviewPopupOpen = false;
      state.isOrderSuccessPopupOpen = false;
      state.isOrderErrorPopupOpen = false;
    },
    toggleOrderErrorPopupOpen(state) {
      state.isOrderErrorPopupOpen = !state.isOrderErrorPopupOpen;

      state.isCallItemPopupOpen = false;
      state.isAddItemPopupOpen = false;
      state.isAddItemSuccessPopupOpen = false;
      state.isRemoveItemPopupOpen = false;
      state.isReviewPopupOpen = false;
      state.isOrderSuccessPopupOpen = false;
      state.isReviewSuccessPopupOpen = false;
    }
  }
});

export const {
  toggleAddItemPopupOpenStatus,
  toggleAddItemSuccessPopupOpenStatus,
  toggleCallItemPopupOpenStatus,
  toggleRemoveItemPopupOpenStatus,
  toggleOrderSuccessPopupOpen,
  toggleReviewPopupOpen,
  toggleReviewSuccessPopupOpen,
  toggleOrderErrorPopupOpen
} = popupProcess.actions;
