import { createDataAction, createErrorAction } from '../helpers';

export const INIT_SUCCESS = 'taxiServices/INIT_SUCCESS';

export const SAVE = 'taxiServices/SAVE';
export const SAVE_SUCCESS = 'taxiServices/SAVE_SUCCESS';
export const SAVE_FAILURE = 'taxiServices/SAVE_FAILURE';

export const ADD = 'taxiServices/ADD';
export const ADD_SUCCESS = 'taxiServices/ADD_SUCCESS';
export const ADD_FAILURE = 'taxiServices/ADD_FAILURE';

export const REMOVE = 'taxiServices/REMOVE';
export const REMOVE_SUCCESS = 'taxiServices/REMOVE_SUCCESS';
export const REMOVE_FAILURE = 'taxiServices/REMOVE_FAILURE';

export const types = {
  INIT_SUCCESS,

  ADD,
  ADD_SUCCESS,
  ADD_FAILURE,

  SAVE,
  SAVE_SUCCESS,
  SAVE_FAILURE,

  REMOVE,
  REMOVE_SUCCESS,
  REMOVE_FAILURE,
};

export default {
  initSuccess: createDataAction(INIT_SUCCESS),

  save: createDataAction(SAVE),
  saveSuccess: createDataAction(SAVE_SUCCESS),
  saveFailure: createErrorAction(SAVE_FAILURE),

  add: createDataAction(ADD),
  addSuccess: createDataAction(ADD_SUCCESS),
  addFailure: createErrorAction(ADD_FAILURE),

  remove: createDataAction(REMOVE),
  removeSuccess: createDataAction(REMOVE_SUCCESS),
  removeFailure: createErrorAction(REMOVE_FAILURE),
};
