import {
  popupProcess,
  toggleAddItemPopupOpenStatus,
  toggleAddItemSuccessPopupOpenStatus,
  toggleCallItemPopupOpenStatus,
  toggleOrderErrorPopupOpen,
  toggleOrderSuccessPopupOpen,
  toggleRemoveItemPopupOpenStatus,
  toggleReviewPopupOpen,
  toggleReviewSuccessPopupOpen
} from './popup-process';

describe('PopupProcess Slice', () => {
  const initialState = {
    isCallItemPopupOpen: false,
    isAddItemPopupOpen: false,
    isAddItemSuccessPopupOpen: false,
    isReviewPopupOpen: false,
    isReviewSuccessPopupOpen: false,
    isRemoveItemPopupOpen: false,
    isOrderSuccessPopupOpen: false,
    isOrderErrorPopupOpen: false
  };

  it('should set all on false except "isCallItemPopupOpen"', () => {
    const expectedState = {
      isCallItemPopupOpen: true,
      isAddItemPopupOpen: false,
      isAddItemSuccessPopupOpen: false,
      isReviewPopupOpen: false,
      isReviewSuccessPopupOpen: false,
      isRemoveItemPopupOpen: false,
      isOrderSuccessPopupOpen: false,
      isOrderErrorPopupOpen: false
    };

    const result = popupProcess.reducer(
      initialState,
      toggleCallItemPopupOpenStatus()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set all on false except "isAddItemPopupOpen"', () => {
    const expectedState = {
      isCallItemPopupOpen: false,
      isAddItemPopupOpen: true,
      isAddItemSuccessPopupOpen: false,
      isReviewPopupOpen: false,
      isReviewSuccessPopupOpen: false,
      isRemoveItemPopupOpen: false,
      isOrderSuccessPopupOpen: false,
      isOrderErrorPopupOpen: false
    };

    const result = popupProcess.reducer(
      initialState,
      toggleAddItemPopupOpenStatus()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set all on false except "isAddItemSuccessPopupOpen"', () => {
    const expectedState = {
      isCallItemPopupOpen: false,
      isAddItemPopupOpen: false,
      isAddItemSuccessPopupOpen: true,
      isReviewPopupOpen: false,
      isReviewSuccessPopupOpen: false,
      isRemoveItemPopupOpen: false,
      isOrderSuccessPopupOpen: false,
      isOrderErrorPopupOpen: false
    };

    const result = popupProcess.reducer(
      initialState,
      toggleAddItemSuccessPopupOpenStatus()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set all on false except "isReviewPopupOpen"', () => {
    const expectedState = {
      isCallItemPopupOpen: false,
      isAddItemPopupOpen: false,
      isAddItemSuccessPopupOpen: false,
      isReviewPopupOpen: true,
      isReviewSuccessPopupOpen: false,
      isRemoveItemPopupOpen: false,
      isOrderSuccessPopupOpen: false,
      isOrderErrorPopupOpen: false
    };

    const result = popupProcess.reducer(
      initialState,
      toggleReviewPopupOpen()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set all on false except "isReviewSuccessPopupOpen"', () => {
    const expectedState = {
      isCallItemPopupOpen: false,
      isAddItemPopupOpen: false,
      isAddItemSuccessPopupOpen: false,
      isReviewPopupOpen: false,
      isReviewSuccessPopupOpen: true,
      isRemoveItemPopupOpen: false,
      isOrderSuccessPopupOpen: false,
      isOrderErrorPopupOpen: false
    };

    const result = popupProcess.reducer(
      initialState,
      toggleReviewSuccessPopupOpen()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set all on false except "isRemoveItemPopupOpen"', () => {
    const expectedState = {
      isCallItemPopupOpen: false,
      isAddItemPopupOpen: false,
      isAddItemSuccessPopupOpen: false,
      isReviewPopupOpen: false,
      isReviewSuccessPopupOpen: false,
      isRemoveItemPopupOpen: true,
      isOrderSuccessPopupOpen: false,
      isOrderErrorPopupOpen: false
    };

    const result = popupProcess.reducer(
      initialState,
      toggleRemoveItemPopupOpenStatus()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set all on false except "isOrderSuccessPopupOpen"', () => {
    const expectedState = {
      isCallItemPopupOpen: false,
      isAddItemPopupOpen: false,
      isAddItemSuccessPopupOpen: false,
      isReviewPopupOpen: false,
      isReviewSuccessPopupOpen: false,
      isRemoveItemPopupOpen: false,
      isOrderSuccessPopupOpen: true,
      isOrderErrorPopupOpen: false
    };

    const result = popupProcess.reducer(
      initialState,
      toggleOrderSuccessPopupOpen()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set all on false except "isOrderErrorPopupOpen"', () => {
    const expectedState = {
      isCallItemPopupOpen: false,
      isAddItemPopupOpen: false,
      isAddItemSuccessPopupOpen: false,
      isReviewPopupOpen: false,
      isReviewSuccessPopupOpen: false,
      isRemoveItemPopupOpen: false,
      isOrderSuccessPopupOpen: false,
      isOrderErrorPopupOpen: true
    };

    const result = popupProcess.reducer(
      initialState,
      toggleOrderErrorPopupOpen()
    );

    expect(result).toEqual(expectedState);
  });
});
