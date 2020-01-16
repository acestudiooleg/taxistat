import { createAction } from '../utils/actions';
import { IRide } from '../constants';

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

export const initSuccess = createAction<IRide[]>(INIT_SUCCESS);

export const save = createAction<IRide>(SAVE);
export const saveSuccess = createAction<IRide>(SAVE_SUCCESS);
export const saveFailure = createAction<Error>(SAVE_FAILURE);

export const add = createAction<IRide>(ADD);
export const addSuccess = createAction<IRide>(ADD_SUCCESS);
export const addFailure = createAction<Error>(ADD_FAILURE);

export const remove = createAction<IRide>(REMOVE);
export const removeSuccess = createAction<IRide>(REMOVE_SUCCESS);
export const removeFailure = createAction<Error>(REMOVE_FAILURE);

export default {
  initSuccess,

  save,
  saveSuccess,
  saveFailure,

  add,
  addSuccess,
  addFailure,

  remove,
  removeSuccess,
  removeFailure,
};
