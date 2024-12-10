import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCallItemPopupOpenStatus = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isCallItemPopupOpen;
export const getAddItemPopupOpenStatus = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isAddItemPopupOpen;
export const getAddItemSuccessPopupOpenStatus = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isAddItemSuccessPopupOpen;

export const getRemoveItemPopupOpenStatus = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isRemoveItemPopupOpen;
export const getOrderSuccessPopupOpenStatus = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isOrderSuccessPopupOpen;
export const getOrderErrorPopupOpenStatus = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isOrderErrorPopupOpen;


export const getReviewPopupOpenStatus = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isReviewPopupOpen;
export const getReviewSuccessPopupOpenStatus = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isReviewSuccessPopupOpen;
