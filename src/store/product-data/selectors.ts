import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCameras = (state: Pick<State, NameSpace.Product>) =>
  state[NameSpace.Product].cameras;
export const getCurrentCamera = (state: Pick<State, NameSpace.Product>) =>
  state[NameSpace.Product].currentCamera;
export const getCamerasInBasket = (state: Pick<State, NameSpace.Product>) =>
  state[NameSpace.Product].camerasInBasket;
export const getSimilarCameras = (state: Pick<State, NameSpace.Product>) =>
  state[NameSpace.Product].similarCameras;

export const getCamerasDataLoadingStatus = (state: Pick<State, NameSpace.Product>) =>
  state[NameSpace.Product].isCamerasDataLoading;

export const getSort = (state: Pick<State, NameSpace.Product>) =>
  state[NameSpace.Product].sort;

export const getFilteredCameras = (state: Pick<State, NameSpace.Product>) =>
  state[NameSpace.Product].filteredCameras;

export const getCategoryFilter = (state: Pick<State, NameSpace.Product>) =>
  state[NameSpace.Product].filterOfCategory;
export const getTypeFilter = (state: Pick<State, NameSpace.Product>) =>
  state[NameSpace.Product].filterOfTypes;
export const getLevelFilter = (state: Pick<State, NameSpace.Product>) =>
  state[NameSpace.Product].filterOfLevels;
export const getPriceFilter = (state: Pick<State, NameSpace.Product>) =>
  state[NameSpace.Product].filterOfPrice;
