import { createAction } from '../utils/actions';

export interface ITaxiServicesData {
  [key: string]: any;
}

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

export const initSuccess = createAction(INIT_SUCCESS);

export const save = createAction(SAVE);
export const saveSuccess = createAction(SAVE_SUCCESS);
export const saveFailure = createAction(SAVE_FAILURE);

export const add = createAction(ADD);
export const addSuccess = createAction(ADD_SUCCESS);
export const addFailure = createAction(ADD_FAILURE);

export const remove = createAction(REMOVE);
export const removeSuccess = createAction(REMOVE_SUCCESS);
export const removeFailure = createAction(REMOVE_FAILURE);

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
