import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getErrorMessage = (state: Pick<State, NameSpace.Error>) =>
  state[NameSpace.Error].errorMessage;
