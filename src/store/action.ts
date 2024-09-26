import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

export const Action = {
  REDIRECT_TO_ROUTE: 'REDIRECT_TO_ROUTE'
};

export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT_TO_ROUTE);
