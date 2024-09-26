import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCameras = (state: Pick<State, NameSpace.Product>) =>
  state[NameSpace.Product].cameras;
export const getCurrentCamera = (state: Pick<State, NameSpace.Product>) =>
  state[NameSpace.Product].currentCamera;

export const getCamerasDataLoadingStatus = (state: Pick<State, NameSpace.Product>) =>
  state[NameSpace.Product].isCamerasDataLoading;