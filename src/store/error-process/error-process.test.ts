import { errorProcess, setError } from './error-process';

describe('ErrorProcess Slice', () => {
  const initialState = {
    errorMessage: null
  };

  it('should set "errorMessage"', () => {
    const expectedState = {
      errorMessage: 'Some error'
    };

    const result = errorProcess.reducer(
      initialState,
      setError(expectedState.errorMessage)
    );

    expect(result).toEqual(expectedState);
  });
});
