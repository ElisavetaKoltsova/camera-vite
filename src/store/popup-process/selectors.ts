import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCallItemPopupOpenStatus = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isCallItemPopupOpen;

export const getAddItemPopupOpenStatus = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isAddItemPopupOpen;

export const getAddItemSuccessPopupOpenStatus = (state: Pick<State, NameSpace.Popup>) =>
  state[NameSpace.Popup].isAddItemSuccessPopupOpen;
