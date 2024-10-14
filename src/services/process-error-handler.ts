import { setError } from '../store/error-peocess/error-process';
import { AppDispatch } from '../types/state';

const TIMEOUT_SHOW_ERROR = 2000;

export const processErrorHandle = (message: string, dispatch: AppDispatch) => {
  dispatch(setError(message));

  setTimeout(
    () => dispatch(setError(null)),
    TIMEOUT_SHOW_ERROR
  );
};
