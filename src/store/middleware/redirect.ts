import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { rootReducer } from '../root-reducer';
import { Action } from '../action';
import browserHistory from '../../browser-history';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === Action.REDIRECT_TO_ROUTE) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
