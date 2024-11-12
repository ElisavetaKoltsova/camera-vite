import { NameSpace, PRICE_FROM, PRICE_TO, Sorts } from '../../const';
import { State } from '../../types/state';
import { makeFakeCamera, makeFakeCameras } from '../../utils/mock';
import { getCameras, getCamerasDataLoadingStatus, getCamerasInBasket, getCategoryFilter, getCurrentCamera, getFilteredCameras, getLevelFilter, getPriceFrom, getPriceTo, getSimilarCameras, getSort, getTypeFilter } from './selectors';

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
      similarCameras:  makeFakeCameras(COUNT_OF_SIMILAR_CAMERAS),
      filteredCameras: [],
      sort: Sorts.PRICE_LOW_TO_HIGH,
      priceFrom: PRICE_FROM,
      priceTo: PRICE_TO,
      filterOfCategory: null,
      filterOfTypes: [],
      filterOfLevels: []
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

  it('should return currentSort from state', () => {
    const { sort } = state[NameSpace.Product];
    const result = getSort(state);

    expect(result).toBe(sort);
  });

  it('should return filteredCameras from state', () => {
    const { filteredCameras } = state[NameSpace.Product];
    const result = getFilteredCameras(state);

    expect(result).toBe(filteredCameras);
  });

  it('should return filterOfCategory from state', () => {
    const { filterOfCategory } = state[NameSpace.Product];
    const result = getCategoryFilter(state);

    expect(result).toBe(filterOfCategory);
  });

  it('should return filterOfTypes from state', () => {
    const { filterOfTypes } = state[NameSpace.Product];
    const result = getTypeFilter(state);

    expect(result).toBe(filterOfTypes);
  });

  it('should return filterOfLevels from state', () => {
    const { filterOfLevels } = state[NameSpace.Product];
    const result = getLevelFilter(state);

    expect(result).toBe(filterOfLevels);
  });

  it('should return priceFrom from state', () => {
    const { priceFrom } = state[NameSpace.Product];
    const result = getPriceFrom(state);

    expect(result).toBe(priceFrom);
  });
  it('should return priceTo from state', () => {
    const { priceTo } = state[NameSpace.Product];
    const result = getPriceTo(state);

    expect(result).toBe(priceTo);
  });
});
