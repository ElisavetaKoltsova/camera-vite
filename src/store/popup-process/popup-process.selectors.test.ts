import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { getAddItemPopupOpenStatus, getAddItemSuccessPopupOpenStatus, getCallItemPopupOpenStatus, getOrderSuccessPopupOpenStatus, getRemoveItemPopupOpenStatus, getReviewPopupOpenStatus, getReviewSuccessPopupOpenStatus } from './selectors';

describe('PopupProcess selectors', () => {
  const state: Pick<State, NameSpace.Popup> = {
    [NameSpace.Popup]: {
      isCallItemPopupOpen: false,
      isAddItemPopupOpen: false,
      isAddItemSuccessPopupOpen: false,
      isReviewPopupOpen: false,
      isReviewSuccessPopupOpen: false,
      isRemoveItemPopupOpen: false,
      isOrderSuccessPopupOpen: false,
      isOrderErrorPopupOpen: false
    }
  };

  it('should return isCallItemPopupOpen from state', () => {
    const { isCallItemPopupOpen } = state[NameSpace.Popup];
    const result = getCallItemPopupOpenStatus(state);

    expect(result).toBe(isCallItemPopupOpen);
  });

  it('should return isAddItemPopupOpen from state', () => {
    const { isAddItemPopupOpen } = state[NameSpace.Popup];
    const result = getAddItemPopupOpenStatus(state);

    expect(result).toBe(isAddItemPopupOpen);
  });

  it('should return isAddItemSuccessPopupOpen from state', () => {
    const { isAddItemSuccessPopupOpen } = state[NameSpace.Popup];
    const result = getAddItemSuccessPopupOpenStatus(state);

    expect(result).toBe(isAddItemSuccessPopupOpen);
  });

  it('should return isReviewPopupOpen from state', () => {
    const { isReviewPopupOpen } = state[NameSpace.Popup];
    const result = getReviewPopupOpenStatus(state);

    expect(result).toBe(isReviewPopupOpen);
  });

  it('should return isReviewSuccessPopupOpen from state', () => {
    const { isReviewSuccessPopupOpen } = state[NameSpace.Popup];
    const result = getReviewSuccessPopupOpenStatus(state);

    expect(result).toBe(isReviewSuccessPopupOpen);
  });

  it('should return isRemoveItemPopupOpen from state', () => {
    const { isRemoveItemPopupOpen } = state[NameSpace.Popup];
    const result = getRemoveItemPopupOpenStatus(state);

    expect(result).toBe(isRemoveItemPopupOpen);
  });

  it('should return isOrderSuccessPopupOpen from state', () => {
    const { isOrderSuccessPopupOpen } = state[NameSpace.Popup];
    const result = getOrderSuccessPopupOpenStatus(state);

    expect(result).toBe(isOrderSuccessPopupOpen);
  });
});
