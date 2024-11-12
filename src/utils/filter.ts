import { CameraCategory, CameraLevel, CameraType } from '../const';
import { Camera } from '../types/camera';
import { findMaximalPrice, findMinimalPrice } from './list';

const Level = {
  ZERO: 'Нулевой',
  NON_PROFESSIONAL: 'Любительский',
  PROFESSIONAL: 'Профессиональный'
};

const PHOTOCAMERA_CATEGORY = 'Фотоаппарат';

export const filterPrice = (cameras: Camera[], priceFrom: number, priceTo: number) =>
  cameras.filter((camera) => camera.price >= priceFrom && camera.price <= priceTo);

export const filterCategory = {
  [CameraCategory.photocamera]: (cameras: Camera[]) =>
    cameras.filter((camera) => camera.category === PHOTOCAMERA_CATEGORY),
  [CameraCategory.videocamera]: (cameras: Camera[]) =>
    cameras.filter((camera) => camera.category === CameraCategory.videocamera)
};

export const filterType = {
  [CameraType.digital]: (cameras: Camera[]) =>
    cameras.filter((camera) => camera.type === CameraType.digital),
  [CameraType.collection]: (cameras: Camera[]) =>
    cameras.filter((camera) => camera.type === CameraType.collection),
  [CameraType.film]: (cameras: Camera[]) =>
    cameras.filter((camera) => camera.type === CameraType.film),
  [CameraType.snapshot]: (cameras: Camera[]) =>
    cameras.filter((camera) => camera.type === CameraType.snapshot),
};

export const filterLevel = {
  [CameraLevel.Нулевой]: (cameras: Camera[]) =>
    cameras.filter((camera) => camera.level === Level.ZERO),
  [CameraLevel.Любительский]: (cameras: Camera[]) =>
    cameras.filter((camera) => camera.level === Level.NON_PROFESSIONAL),
  [CameraLevel.Профессиональный]: (cameras: Camera[]) =>
    cameras.filter((camera) => camera.level === Level.PROFESSIONAL),
};

export const applyFilters = (
  cameras: Camera[],
  filterOfCategory: CameraCategory | null,
  filterOfTypes: CameraType[],
  filterOfLevels: CameraLevel[]
) => {
  let filteredCameras: Camera[] = cameras;

  if (filterOfCategory) {
    filteredCameras = filterCategory[filterOfCategory]([...filteredCameras]);
  }

  if (filterOfTypes.length) {
    filteredCameras = filterOfTypes.reduce((filtered, type) => {
      const typeFiltered = filterType[type](filteredCameras);
      return filtered.concat(
        typeFiltered.filter(
          (camera) => !filtered.includes(camera)
        )
      );
    }, [] as Camera[]);
  }

  if (filterOfLevels.length) {
    filteredCameras = filterOfLevels.reduce((filtered, level) => {
      const levelFiltered = filterLevel[level](filteredCameras);
      return filtered.concat(
        levelFiltered.filter(
          (camera) => !filtered.includes(camera)
        )
      );
    }, [] as Camera[]);
  }

  const priceFrom = findMinimalPrice(filteredCameras);
  const priceTo = findMaximalPrice(filteredCameras);

  filteredCameras = filterPrice(filteredCameras, priceFrom, priceTo);

  return filteredCameras;
};

export const changeFiltersByPrice = (filteredCameras: Camera[], priceFrom: number, priceTo: number) => {
  const filteredPriceFrom = findMinimalPrice(filteredCameras);
  const filteredPriceTo = findMaximalPrice(filteredCameras);

  priceFrom = priceFrom > filteredPriceFrom ? priceFrom : filteredPriceFrom;
  priceTo = priceTo < filteredPriceTo ? priceTo : filteredPriceTo;

  filteredCameras = filterPrice(filteredCameras, priceFrom, priceTo);

  return {filteredCameras, priceFrom: findMinimalPrice(filteredCameras), priceTo: findMaximalPrice(filteredCameras)};
};
