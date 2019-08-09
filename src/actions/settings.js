import { createDataAction } from '../helpers';

export const SAVE = 'settings/SAVE';
export const SAVE_SUCCESS = 'settings/SAVE_SUCCESS';
export const SAVE_FAILURE = 'settings/SAVE_FAILURE';

export const types = {
  SAVE,
  SAVE_SUCCESS,
  SAVE_FAILURE,
};

export default {
  save: createDataAction(SAVE),
  saveSuccess: createDataAction(SAVE_SUCCESS),
  saveFailure: createDataAction(SAVE_FAILURE),
};
