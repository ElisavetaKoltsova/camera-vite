import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { makeFakeCamera, makeFakeCameras } from '../../utils/mock';
import { getCameras, getCamerasDataLoadingStatus, getCamerasInBasket, getCurrentCamera, getSimilarCameras } from './selectors';

describe('ProductData selectors', () => {
  const COUNT_OF_CAMERAS = 10;
  const COUNT_OF_CAMERAS_IN_BASKET = 5;
  const COUNT_OF_SIMILAR_CAMERAS = 9;

  const state: Pick<State, NameSpace.Product> = {
    [NameSpace.Product]: {
      cameras: makeFakeCameras(COUNT_OF_CAMERAS),
      camerasInBasket:  makeFakeCameras(COUNT_OF_CAMERAS_IN_BASKET),
      isCamerasDataLoading: false,
      currentCamera: makeFakeCamera(),
      similarCameras:  makeFakeCameras(COUNT_OF_SIMILAR_CAMERAS)
    }
  };

  it('should return cameras from state', () => {
    const { cameras } = state[NameSpace.Product];
    const result = getCameras(state);

    expect(result).toBe(cameras);
  });

  it('should return camerasInBasket from state', () => {
    const { camerasInBasket } = state[NameSpace.Product];
    const result = getCamerasInBasket(state);

    expect(result).toBe(camerasInBasket);
  });

  it('should return isCamerasDataLoading from state', () => {
    const { isCamerasDataLoading } = state[NameSpace.Product];
    const result = getCamerasDataLoadingStatus(state);

    expect(result).toBe(isCamerasDataLoading);
  });

  it('should return similarCameras from state', () => {
    const { similarCameras } = state[NameSpace.Product];
    const result = getSimilarCameras(state);

    expect(result).toBe(similarCameras);
  });

  it('should return currentCamera from state', () => {
    const { currentCamera } = state[NameSpace.Product];
    const result = getCurrentCamera(state);

    expect(result).toBe(currentCamera);
  });
});
