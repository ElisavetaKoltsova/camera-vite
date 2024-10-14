import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { getErrorMessage } from './selectors';

describe('ErrorProcess selectors', () => {
  const state: Pick<State, NameSpace.Error> = {
    [NameSpace.Error]: {
      errorMessage: null
    }
  };

  it('should return errorMessage from state', () => {
    const { errorMessage } = state[NameSpace.Error];
    const result = getErrorMessage(state);

    expect(result).toBe(errorMessage);
  });
});
