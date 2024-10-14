import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import { State } from '../../types/state';
import { redirect } from './redirect';
import { redirectToRoute } from '../action';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/basket" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Basket);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Basket);
  });

  it('should not redirect to "/" with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.Catalog};
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Catalog);
  });
});
