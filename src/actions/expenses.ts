import { createAction } from '../utils/actions';
import { IExpense } from '../constants';

export const INIT_SUCCESS = 'EXPENSES/INIT_SUCCESS';

export const SAVE = 'EXPENSES/SAVE';
export const SAVE_SUCCESS = 'EXPENSES/SAVE_SUCCESS';
export const SAVE_FAILURE = 'EXPENSES/SAVE_FAILURE';

export const ADD = 'EXPENSES/ADD';
export const ADD_SUCCESS = 'EXPENSES/ADD_SUCCESS';
export const ADD_FAILURE = 'EXPENSES/ADD_FAILURE';

export const REMOVE = 'EXPENSES/REMOVE';
export const REMOVE_SUCCESS = 'EXPENSES/REMOVE_SUCCESS';
export const REMOVE_FAILURE = 'EXPENSES/REMOVE_FAILURE';

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

export const initSuccess = createAction<IExpense[]>(INIT_SUCCESS);

export const save = createAction<IExpense>(SAVE);
export const saveSuccess = createAction<IExpense>(SAVE_SUCCESS);
export const saveFailure = createAction<Error>(SAVE_FAILURE);

export const add = createAction<IExpense>(ADD);
export const addSuccess = createAction<IExpense>(ADD_SUCCESS);
export const addFailure = createAction<Error>(ADD_FAILURE);

export const remove = createAction<IExpense>(REMOVE);
export const removeSuccess = createAction<IExpense>(REMOVE_SUCCESS);
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
