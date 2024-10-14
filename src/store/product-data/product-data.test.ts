import { makeFakeCameras, makeFakeCamera } from '../../utils/mock';
import { fetchCamerasAction, fetchCurrentCameraAction, fetchSimilarCamerasAction } from '../api-action';
import { productData } from './product-data';

describe('ProductData Slice', () => {
  const COUNT_OF_CAMERAS = 10;
  const COUNT_OF_CAMERAS_IN_BASKET = 5;
  const COUNT_OF_SIMILAR_CAMERAS = 9;

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      cameras: makeFakeCameras(COUNT_OF_CAMERAS),
      camerasInBasket:  makeFakeCameras(COUNT_OF_CAMERAS_IN_BASKET),
      isCamerasDataLoading: false,
      currentCamera: makeFakeCamera(),
      similarCameras:  makeFakeCameras(COUNT_OF_SIMILAR_CAMERAS)
    };

    const result = productData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      cameras: [],
      camerasInBasket:  [],
      isCamerasDataLoading: false,
      currentCamera: null,
      similarCameras:  []
    };

    const result = productData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isCamerasDataLoading" to "true" with "fetchCamerasAction.pending"', () => {
    const expectedState = {
      cameras: [],
      camerasInBasket:  [],
      isCamerasDataLoading: true,
      currentCamera: null,
      similarCameras:  []
    };

    const result = productData.reducer(undefined, fetchCamerasAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "isCamerasDataLoading" to "true" with "fetchCurrentCameraAction.pending"', () => {
    const expectedState = {
      cameras: [],
      camerasInBasket:  [],
      isCamerasDataLoading: true,
      currentCamera: null,
      similarCameras:  []
    };

    const result = productData.reducer(undefined, fetchCurrentCameraAction.pending);

    expect(result).toEqual(expectedState);
  });
  it('should set "isCamerasDataLoading" to "true" with "fetchSimilarCamerasAction.pending"', () => {
    const expectedState = {
      cameras: [],
      camerasInBasket:  [],
      isCamerasDataLoading: true,
      currentCamera: null,
      similarCameras:  []
    };

    const result = productData.reducer(undefined, fetchSimilarCamerasAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "cameras" to array with cameras, "isCamerasDataLoading" to "false" with "fetchCamerasAction.fulfilled"', () => {
    const mockCameras = makeFakeCameras(COUNT_OF_CAMERAS);
    const expectedState = {
      cameras: [...mockCameras],
      camerasInBasket:  [],
      isCamerasDataLoading: false,
      currentCamera: null,
      similarCameras:  []
    };

    const result = productData.reducer(undefined, fetchCamerasAction.fulfilled(mockCameras, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "currentCamera" to currentCamera, "isCamerasDataLoading" to "false" with "fetchCurrentCameraAction.fulfilled"', () => {
    const mockCamera = makeFakeCamera();
    const expectedState = {
      cameras: [],
      camerasInBasket:  [],
      isCamerasDataLoading: false,
      currentCamera: mockCamera,
      similarCameras:  []
    };

    const result = productData.reducer(undefined, fetchCurrentCameraAction.fulfilled(mockCamera, '', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "similarCameras" to array with similarCameras, "isCamerasDataLoading" to "false" with "fetchSimilarCamerasAction.fulfilled"', () => {
    const mockCameras = makeFakeCameras(COUNT_OF_CAMERAS);
    const expectedState = {
      cameras: [],
      camerasInBasket:  [],
      isCamerasDataLoading: false,
      currentCamera: null,
      similarCameras:  [...mockCameras]
    };

    const result = productData.reducer(undefined, fetchSimilarCamerasAction.fulfilled(mockCameras, '', ''));

    expect(result).toEqual(expectedState);
  });
});
