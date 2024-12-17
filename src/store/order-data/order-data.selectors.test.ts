import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { getErrorStatus, getOrderDataLoadingStatus } from './selectors';

describe('OrderData selectors', () => {
  const state: Pick<State, NameSpace.Order> = {
    [NameSpace.Order]: {
      isOrderDataLoading: false,
      isErrorPostOrder: false
    }
  };

  it('should return isOrderDataLoading from state', () => {
    const { isOrderDataLoading } = state[NameSpace.Order];
    const result = getOrderDataLoadingStatus(state);

    expect(result).toBe(isOrderDataLoading);
  });

  it('should return isErrorPostOrder from state', () => {
    const { isErrorPostOrder } = state[NameSpace.Order];
    const result = getErrorStatus(state);

    expect(result).toBe(isErrorPostOrder);
  });
});
