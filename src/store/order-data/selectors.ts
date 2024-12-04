import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getOrderDataLoadingStatus = (state: Pick<State, NameSpace.Order>) =>
  state[NameSpace.Order].isOrderDataLoading;
