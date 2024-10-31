import { CameraCategory, CameraFilterPrice, CameraLevel, CameraType } from '../const';
import { Camera } from '../types/camera';

const Level = {
  ZERO: 'Нулевой',
  NON_PROFESSIONAL: 'Любительский',
  PROFESSIONAL: 'Профессиональный'
};

export const resetFilters = (cameras: Camera[]) => cameras;

export const filterPrice = {
  [CameraFilterPrice.From]: (cameras: Camera[], priceFrom: number) => cameras.filter((camera) => camera.price >= priceFrom),
  [CameraFilterPrice.To]: (cameras: Camera[], priceTo: number) => cameras.filter((camera) => camera.price <= priceTo)
};

export const filterCategory = {
  [CameraCategory.photocamera]: (cameras: Camera[]) =>
    cameras.filter((camera) => camera.category === CameraCategory.photocamera),
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
