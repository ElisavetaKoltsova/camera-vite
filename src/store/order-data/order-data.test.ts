import { OrderData } from '../../types/state';
import { postOrderAction } from '../api-action';
import { orderData, setErrorStatus } from './order-data';

describe('OrderData Slice', () => {
  const initialState: OrderData = {
    isOrderDataLoading: false,
    isErrorPostOrder: true
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      isOrderDataLoading: false,
      isErrorPostOrder: false
    };

    const result = orderData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      isOrderDataLoading: false,
      isErrorPostOrder: false
    };

    const result = orderData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isOrderDataLoading" to "true" with "postOrderAction.pending"', () => {
    const expectedState = {
      isOrderDataLoading: true,
      isErrorPostOrder: false
    };

    const result = orderData.reducer(undefined, postOrderAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "isOrderDataLoading" to "false" with "postOrderAction.fulfilled"', () => {
    const expectedState = {
      isOrderDataLoading: false,
      isErrorPostOrder: false
    };

    const result = orderData.reducer(undefined, postOrderAction.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should set "isOrderDataLoading" to "false" and "isErrorPostOrder" to "true" with "postOrderAction.rejected"', () => {
    const expectedState = {
      isOrderDataLoading: false,
      isErrorPostOrder: true
    };

    const result = orderData.reducer(undefined, postOrderAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set error status to "false" by "setErrorStatus"', () => {
    const expectedState = {
      isOrderDataLoading: false,
      isErrorPostOrder: false
    };

    const result = orderData.reducer(
      initialState,
      setErrorStatus()
    );

    expect(result).toEqual(expectedState);
  });
});
