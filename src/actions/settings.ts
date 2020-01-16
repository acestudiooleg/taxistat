import { createAction, createEmptyAction } from '../utils/actions';

export interface ISettingsData {
  done: boolean;
  initialized: boolean;
  fuelConsumption: number;
  fuelPrice: number;
  lang: string;
  currency: string;
  distanceName: string;
  taxiDriver: boolean;
  activeStep: number;
  timePrice: number;
  timePriceEnabled: boolean;
}

export const INIT = 'SETTINGS/INIT';
export const INIT_SUCCESS = 'SETTINGS/INIT_SUCCESS';
export const INIT_FAILURE = 'SETTINGS/INIT_FAILURE';
export const SAVE = 'SETTINGS/SAVE';
export const SAVE_SUCCESS = 'SETTINGS/SAVE_SUCCESS';
export const SAVE_FAILURE = 'SETTINGS/SAVE_FAILURE';

export const types = {
  INIT,
  INIT_SUCCESS,
  INIT_FAILURE,
  SAVE,
  SAVE_SUCCESS,
  SAVE_FAILURE,
};

export const init = createEmptyAction(INIT);
export const initSuccess = createAction<ISettingsData>(INIT_SUCCESS);
export const initFailure = createAction<Error>(INIT_FAILURE);

export const save = createEmptyAction(SAVE);
export const saveSuccess = createAction<ISettingsData>(SAVE_SUCCESS);
export const saveFailure = createAction<Error>(SAVE_FAILURE);

export default {
  init,
  initSuccess,
  initFailure,
  save,
  saveSuccess,
  saveFailure,
};
