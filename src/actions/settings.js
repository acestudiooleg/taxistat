import { createDataAction, createEmptyAction, createErrorAction } from '../helpers';

export const INIT = 'settings/INIT';
export const INIT_SUCCESS = 'settings/INIT_SUCCESS';
export const INIT_FAILURE = 'settings/INIT_FAILURE';

export const SAVE = 'settings/SAVE';
export const SAVE_SUCCESS = 'settings/SAVE_SUCCESS';
export const SAVE_FAILURE = 'settings/SAVE_FAILURE';

export const types = {
  INIT,
  INIT_SUCCESS,
  INIT_FAILURE,

  SAVE,
  SAVE_SUCCESS,
  SAVE_FAILURE,
};

export default {
  init: createEmptyAction(INIT),
  initSuccess: createDataAction(INIT_SUCCESS),
  initFailure: createErrorAction(INIT_FAILURE),

  save: createDataAction(SAVE),
  saveSuccess: createDataAction(SAVE_SUCCESS),
  saveFailure: createErrorAction(SAVE_FAILURE),
};
