import { CameraCategory, CameraFilterPrice, CameraLevel, CameraType } from '../const';
import { Camera } from '../types/camera';

const Level = {
  ZERO: 'Нулевой',
  NON_PROFESSIONAL: 'Любительский',
  PROFESSIONAL: 'Профессиональный'
};

const PHOTOCAMERA_CATEGORY = 'Фотоаппарат';

export const filterPrice = {
  [CameraFilterPrice.From]:
    (cameras: Camera[], priceFrom: number) =>
      cameras.filter((camera) => camera.price >= priceFrom)
};

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
  filterOfPrice: CameraFilterPrice | null,
  filterOfCategory: CameraCategory | null,
  filterOfTypes: CameraType[],
  filterOfLevels: CameraLevel[],
  priceFrom: number | null,
  priceTo: number | null
) => {
  let filteredCameras: Camera[] = cameras;
  if (filterOfPrice) {
    if (priceFrom && priceTo) {
      filteredCameras = [...filteredCameras].filter((camera) => camera.price >= priceFrom && camera.price <= priceTo);
    }
    if(priceFrom && !priceTo) {
      filteredCameras = filterPrice[CameraFilterPrice.From]([...filteredCameras], priceFrom);
    }
  }

  if (filterOfCategory) {
    filteredCameras = filterCategory[filterOfCategory]([...filteredCameras]);
  }

  if (filterOfTypes.length > 0) {
    filteredCameras = filterOfTypes.reduce((filtered, type) => {
      const typeFiltered = filterType[type](filteredCameras);
      return filtered.concat(
        typeFiltered.filter(
          (camera) => !filtered.includes(camera)
        )
      );
    }, [] as Camera[]);
  }

  if (filterOfLevels.length > 0) {
    filteredCameras = filterOfLevels.reduce((filtered, level) => {
      const levelFiltered = filterLevel[level](filteredCameras);
      return filtered.concat(
        levelFiltered.filter(
          (camera) => !filtered.includes(camera)
        )
      );
    }, [] as Camera[]);
  }

  return filteredCameras;
};
