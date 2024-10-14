import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorProcess } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: ErrorProcess = {
  errorMessage: null
};

export const errorProcess = createSlice({
  name: NameSpace.Error,
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
    }
  }
});

export const { setError } = errorProcess.actions;
