import { CameraCategory, CameraLevel, CameraType, PRICE_FROM, PRICE_TO, Sorts } from '../../const';
import { Camera } from '../../types/camera';
import { ProductData } from '../../types/state';
import { filterCategory, filterLevel, filterType } from '../../utils/filter';
import { findMaximalPrice, findMinimalPrice } from '../../utils/list';
import { makeFakeCameras, makeFakeCamera } from '../../utils/mock';
import { sort } from '../../utils/sort';
import { fetchCamerasAction, fetchCurrentCameraAction, fetchSimilarCamerasAction } from '../api-action';
import { filterCamerasCategory, filterCamerasLevel, filterCamerasPrice, filterCamerasType, productData, resetFilters, sortCameras } from './product-data';

describe('ProductData Slice', () => {
  const COUNT_OF_CAMERAS = 10;
  const COUNT_OF_CAMERAS_IN_BASKET = 5;
  const COUNT_OF_SIMILAR_CAMERAS = 9;

  const initialMockCameras = sort[Sorts.POPULAR_LOW_TO_HIGH](makeFakeCameras(COUNT_OF_CAMERAS));

  const initialState: ProductData = {
    cameras: [...initialMockCameras],
    filteredCameras: [],
    currentCamera: null,
    similarCameras: [],
    camerasInBasket: [],
    isCamerasDataLoading: false,
    sort: Sorts.PRICE_LOW_TO_HIGH,
    priceFrom: findMinimalPrice(initialMockCameras),
    priceTo: findMaximalPrice(initialMockCameras),
    filterOfCategory: null,
    filterOfTypes: [],
    filterOfLevels: []
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      cameras: makeFakeCameras(COUNT_OF_CAMERAS),
      filteredCameras: makeFakeCameras(COUNT_OF_CAMERAS),
      camerasInBasket:  makeFakeCameras(COUNT_OF_CAMERAS_IN_BASKET),
      isCamerasDataLoading: false,
      currentCamera: makeFakeCamera(),
      similarCameras:  makeFakeCameras(COUNT_OF_SIMILAR_CAMERAS),
      sort: Sorts.PRICE_LOW_TO_HIGH,
      priceFrom: PRICE_FROM,
      priceTo: PRICE_TO,
      filterOfCategory: CameraCategory.photocamera,
      filterOfTypes: [CameraType.collection, CameraType.digital],
      filterOfLevels: [CameraLevel.Нулевой]
    };

    const result = productData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      cameras: [],
      camerasInBasket: [],
      isCamerasDataLoading: false,
      currentCamera: null,
      similarCameras: [],
      filteredCameras: [],
      sort: Sorts.PRICE_LOW_TO_HIGH,
      priceFrom: PRICE_FROM,
      priceTo: PRICE_TO,
      filterOfCategory: null,
      filterOfTypes: [],
      filterOfLevels: []
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
      similarCameras:  [],
      filteredCameras: [],
      sort: Sorts.PRICE_LOW_TO_HIGH,
      priceFrom: PRICE_FROM,
      priceTo: PRICE_TO,
      filterOfCategory: null,
      filterOfTypes: [],
      filterOfLevels: []
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
      similarCameras:  [],
      filteredCameras: [],
      sort: Sorts.PRICE_LOW_TO_HIGH,
      priceFrom: PRICE_FROM,
      priceTo: PRICE_TO,
      filterOfCategory: null,
      filterOfTypes: [],
      filterOfLevels: []
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
      similarCameras:  [],
      filteredCameras: [],
      sort: Sorts.PRICE_LOW_TO_HIGH,
      priceFrom: PRICE_FROM,
      priceTo: PRICE_TO,
      filterOfCategory: null,
      filterOfTypes: [],
      filterOfLevels: []
    };

    const result = productData.reducer(undefined, fetchSimilarCamerasAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "cameras" to array with cameras and change "priceFrom" and "priceTo", "isCamerasDataLoading" to "false" with "fetchCamerasAction.fulfilled"', () => {
    const mockCameras = sort[Sorts.PRICE_LOW_TO_HIGH](makeFakeCameras(COUNT_OF_CAMERAS));
    const expectedState = {
      cameras: [...mockCameras],
      camerasInBasket:  [],
      isCamerasDataLoading: false,
      currentCamera: null,
      similarCameras:  [],
      filteredCameras: [],
      sort: Sorts.PRICE_LOW_TO_HIGH,
      priceFrom: findMinimalPrice(mockCameras),
      priceTo: findMaximalPrice(mockCameras),
      filterOfCategory: null,
      filterOfTypes: [],
      filterOfLevels: []
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
      similarCameras:  [],
      filteredCameras: [],
      sort: Sorts.PRICE_LOW_TO_HIGH,
      priceFrom: PRICE_FROM,
      priceTo: PRICE_TO,
      filterOfCategory: null,
      filterOfTypes: [],
      filterOfLevels: []
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
      similarCameras:  [...mockCameras],
      filteredCameras: [],
      sort: Sorts.PRICE_LOW_TO_HIGH,
      priceFrom: PRICE_FROM,
      priceTo: PRICE_TO,
      filterOfCategory: null,
      filterOfTypes: [],
      filterOfLevels: []
    };

    const result = productData.reducer(undefined, fetchSimilarCamerasAction.fulfilled(mockCameras, '', ''));

    expect(result).toEqual(expectedState);
  });

  it('"SortCameras" should change "sort" and sort "cameras"', () => {
    const mockCameras = [...initialState.cameras];

    const exceptedState = {
      cameras: [...mockCameras],
      filteredCameras: [],
      currentCamera: null,
      similarCameras: [],
      camerasInBasket: [],
      isCamerasDataLoading: false,
      sort: Sorts.POPULAR_LOW_TO_HIGH,
      priceFrom: findMinimalPrice(mockCameras),
      priceTo: findMaximalPrice(mockCameras),
      filterOfCategory: null,
      filterOfTypes: [],
      filterOfLevels: []
    };

    const result = productData.reducer(
      initialState,
      sortCameras(Sorts.POPULAR_LOW_TO_HIGH)
    );

    expect(result).toEqual(exceptedState);
  });

  it('"filterCamerasPrice" should change "priceFrom" and "priceTo", and filter "filteredCameras" by price', () => {
    const mockCameras = [...initialState.cameras];

    const mockPriceFrom = 5000;
    const mockPriceTo = 70000;

    const mockFilteredCameras = [...mockCameras]
      .filter((camera) =>
        camera.price >= mockPriceFrom && camera.price <= mockPriceTo
      );

    const exceptedState = {
      cameras: [...mockCameras],
      filteredCameras: [...mockFilteredCameras],
      currentCamera: null,
      similarCameras: [],
      camerasInBasket: [],
      isCamerasDataLoading: false,
      sort: Sorts.PRICE_LOW_TO_HIGH,
      priceFrom: findMinimalPrice(mockFilteredCameras),
      priceTo: findMaximalPrice(mockFilteredCameras),
      filterOfCategory: null,
      filterOfTypes: [],
      filterOfLevels: []
    };

    const result = productData.reducer(
      initialState,
      filterCamerasPrice({
        priceFrom: findMinimalPrice(mockFilteredCameras),
        priceTo: findMaximalPrice(mockFilteredCameras)
      })
    );

    expect(result).toEqual(exceptedState);
  });

  it('"filterCamerasCategory" should change "filterOfCategory", "priceFrom" and "priceTo", and filter "filteredCameras" by category', () => {
    const mockCameras = [...initialState.cameras];

    const mockFilteredCameras = filterCategory[CameraCategory.photocamera]([...mockCameras]);

    const exceptedState = {
      cameras: [...mockCameras],
      filteredCameras: [...mockFilteredCameras],
      currentCamera: null,
      similarCameras: [],
      camerasInBasket: [],
      isCamerasDataLoading: false,
      sort: Sorts.PRICE_LOW_TO_HIGH,
      priceFrom: findMinimalPrice(mockFilteredCameras),
      priceTo: findMaximalPrice(mockFilteredCameras),
      filterOfCategory: CameraCategory.photocamera,
      filterOfTypes: [],
      filterOfLevels: []
    };

    const result = productData.reducer(
      initialState,
      filterCamerasCategory(CameraCategory.photocamera)
    );

    expect(result).toEqual(exceptedState);
  });

  it('"filterCamerasType" should change "filterOfType", "priceFrom" and "priceTo", and filter "filteredCameras" by type', () => {
    const mockCameras = [...initialState.cameras];

    const filterOfTypes = [CameraType.film, CameraType.digital];

    const mockFilteredCameras = filterOfTypes.reduce((filtered, type) => {
      const typeFiltered = filterType[type](mockCameras);
      return filtered.concat(
        typeFiltered.filter(
          (camera) => !filtered.includes(camera)
        )
      );
    }, [] as Camera[]);

    const exceptedState = {
      cameras: [...mockCameras],
      filteredCameras: [...mockFilteredCameras],
      currentCamera: null,
      similarCameras: [],
      camerasInBasket: [],
      isCamerasDataLoading: false,
      sort: Sorts.PRICE_LOW_TO_HIGH,
      priceFrom: findMinimalPrice(mockFilteredCameras),
      priceTo: findMaximalPrice(mockFilteredCameras),
      filterOfCategory: null,
      filterOfTypes: [...filterOfTypes],
      filterOfLevels: []
    };

    const result = productData.reducer(
      initialState,
      filterCamerasType([CameraType.film, CameraType.digital])
    );

    expect(result).toEqual(exceptedState);
  });

  it('"filterCamerasLevel" should change "filterOfLevel", "priceFrom" and "priceTo", and filter "filteredCameras" by level', () => {
    const mockCameras = [...initialState.cameras];

    const filterOfLevels = [CameraLevel.Любительский];

    const mockFilteredCameras = filterOfLevels.reduce((filtered, level) => {
      const levelFiltered = filterLevel[level](mockCameras);
      return filtered.concat(
        levelFiltered.filter(
          (camera) => !filtered.includes(camera)
        )
      );
    }, [] as Camera[]);

    const exceptedState = {
      cameras: [...mockCameras],
      filteredCameras: [...mockFilteredCameras],
      currentCamera: null,
      similarCameras: [],
      camerasInBasket: [],
      isCamerasDataLoading: false,
      sort: Sorts.PRICE_LOW_TO_HIGH,
      priceFrom: findMinimalPrice(mockFilteredCameras),
      priceTo: findMaximalPrice(mockFilteredCameras),
      filterOfCategory: null,
      filterOfTypes: [],
      filterOfLevels: [...filterOfLevels]
    };

    const result = productData.reducer(
      initialState,
      filterCamerasLevel([CameraLevel.Любительский])
    );

    expect(result).toEqual(exceptedState);
  });

  it('"resetFilters" should reset all filters', () => {
    const mockCameras = [...initialState.cameras];

    const exceptedState = {
      cameras: [...mockCameras],
      filteredCameras: [],
      currentCamera: null,
      similarCameras: [],
      camerasInBasket: [],
      isCamerasDataLoading: false,
      sort: Sorts.PRICE_LOW_TO_HIGH,
      priceFrom: findMinimalPrice(mockCameras),
      priceTo: findMaximalPrice(mockCameras),
      filterOfCategory: null,
      filterOfTypes: [],
      filterOfLevels: []
    };

    const result = productData.reducer(
      initialState,
      resetFilters()
    );

    expect(result).toEqual(exceptedState);
  });
});
