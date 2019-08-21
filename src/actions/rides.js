import { createDataAction, createErrorAction } from '../helpers';

export const INIT_SUCCESS = 'rides/INIT_SUCCESS';

export const SAVE = 'rides/SAVE';
export const SAVE_SUCCESS = 'rides/SAVE_SUCCESS';
export const SAVE_FAILURE = 'rides/SAVE_FAILURE';

export const ADD = 'rides/ADD';
export const ADD_SUCCESS = 'rides/ADD_SUCCESS';
export const ADD_FAILURE = 'rides/ADD_FAILURE';

export const REMOVE = 'rides/REMOVE';
export const REMOVE_SUCCESS = 'rides/REMOVE_SUCCESS';
export const REMOVE_FAILURE = 'rides/REMOVE_FAILURE';

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
