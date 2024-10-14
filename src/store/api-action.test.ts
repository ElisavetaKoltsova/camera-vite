import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { AppThunkDispatch, extractActionsTypes, makeFakeCamera, makeFakeCameras, makeFakePromos, makeFakeReviews } from '../utils/mock';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { fetchCamerasAction, fetchCurrentCameraAction, fetchPromosAction, fetchReviewsAction, fetchSimilarCamerasAction, postCouponAction, postOrderAction } from './api-action';
import { APIRoute, CouponName } from '../const';
import MockAdapter from 'axios-mock-adapter';
import { Order } from '../types/order';
import { Coupon } from '../types/promo';

describe('Async actions', () => {
  const COUNT_OF_CAMERAS = 10;
  const COUNT_OF_REVIEWS = 10;
  const COUNT_OF_PROMOS = 10;

  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({PRODUCT: {cameras: []}});
  });

  describe('fetchCamerasAction', () => {
    it('should dispatch "fetchCamerasAction.pending", "fetchCamerasAction.fulfilled", when server response 200', async () => {
      const mockCameras = [makeFakeCameras(COUNT_OF_CAMERAS)];
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(200, mockCameras);

      await store.dispatch(fetchCamerasAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCamerasActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCamerasAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.fulfilled.type,
      ]);

      expect(fetchCamerasActionFulfilled.payload)
        .toEqual(mockCameras);
    });
  });

  describe('fetchCurrentCameraAction', () => {
    it('should dispatch "fetchCurrentCameraAction.pending", "fetchCurrentCameraAction.fulfilled", when server response 200', async () => {
      const mockCamera = makeFakeCamera();
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockCamera.id}`).reply(200, mockCamera);

      await store.dispatch(fetchCurrentCameraAction(String(mockCamera.id)));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCurrentCameraActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCurrentCameraAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCurrentCameraAction.pending.type,
        fetchCurrentCameraAction.fulfilled.type,
      ]);

      expect(fetchCurrentCameraActionFulfilled.payload)
        .toEqual(mockCamera);
    });
  });

  describe('fetchReviewsAction', () => {
    it('should dispatch "fetchReviewsAction.pending" and "fetchReviewsAction.fulfilled" when server response is 200', async () => {
      const mockReviews = makeFakeReviews(COUNT_OF_REVIEWS);
      const mockCameraId = '1';
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockCameraId}${APIRoute.Reviews}`).reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(mockCameraId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload)
        .toEqual(mockReviews);
    });
  });

  describe('fetchPromosAction', () => {
    it('should dispatch "fetchPromosAction.pending", "fetchPromosAction.fulfilled", when server response 200', async () => {
      const mockPromos = [makeFakePromos(COUNT_OF_PROMOS)];
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromos);

      await store.dispatch(fetchPromosAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromosActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromosAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchPromosAction.pending.type,
        fetchPromosAction.fulfilled.type,
      ]);

      expect(fetchPromosActionFulfilled.payload)
        .toEqual(mockPromos);
    });

    describe('fetchSimilarCamerasAction', () => {
      it('should dispatch "fetchSimilarCamerasAction.pending", "fetchSimilarCamerasAction.fulfilled", when server response 200', async () => {
        const mockCamera = makeFakeCamera();
        const mockCameras = [makeFakeCameras(COUNT_OF_CAMERAS)];
        mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockCamera.id}${APIRoute.Similar}`).reply(200, mockCameras);

        await store.dispatch(fetchSimilarCamerasAction(String(mockCamera.id)));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchCamerasActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSimilarCamerasAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchSimilarCamerasAction.pending.type,
          fetchSimilarCamerasAction.fulfilled.type,
        ]);

        expect(fetchCamerasActionFulfilled.payload)
          .toEqual(mockCameras);
      });
    });
  });

  describe('postOrderAction', () => {
    it('should dispatch "postOrderAction.pending", "postOrderAction.fulfilled" when server response 200', async() => {
      const fakeOrder: Order = {
        camerasIds: [1],
        coupon: CouponName.Coupon333,
        tel: '+79999999999'
      };

      mockAxiosAdapter.onPost(APIRoute.Orders).reply(200, undefined);

      await store.dispatch(postOrderAction(fakeOrder));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postOrderAction.pending.type,
        postOrderAction.fulfilled.type,
      ]);
    });
  });

  describe('postCouponAction', () => {
    it('should dispatch "postCouponAction.pending", "postCouponAction.fulfilled" when server response 200', async() => {
      const fakeCoupon: Coupon = {
        coupon: CouponName.Coupon333
      };
      const couponDiscount = 15;

      mockAxiosAdapter.onPost(APIRoute.Coupon).reply(200, couponDiscount);

      await store.dispatch(postCouponAction(fakeCoupon));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postCouponAction.pending.type,
        postCouponAction.fulfilled.type,
      ]);
    });
  });
});
