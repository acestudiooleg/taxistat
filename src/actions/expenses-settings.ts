import { createAction } from '../utils/actions';
import { IExpenseSetting } from '../constants';

export const INIT_SUCCESS = 'expensesSettings/INIT_SUCCESS';

export const SAVE = 'expensesSettings/SAVE';
export const SAVE_SUCCESS = 'expensesSettings/SAVE_SUCCESS';
export const SAVE_FAILURE = 'expensesSettings/SAVE_FAILURE';

export const ADD = 'expensesSettings/ADD';
export const ADD_SUCCESS = 'expensesSettings/ADD_SUCCESS';
export const ADD_FAILURE = 'expensesSettings/ADD_FAILURE';

export const REMOVE = 'expensesSettings/REMOVE';
export const REMOVE_SUCCESS = 'expensesSettings/REMOVE_SUCCESS';
export const REMOVE_FAILURE = 'expensesSettings/REMOVE_FAILURE';

export const types = {
  INIT_SUCCESS,

  SAVE,
  SAVE_SUCCESS,
  SAVE_FAILURE,

  ADD,
  ADD_SUCCESS,
  ADD_FAILURE,
};

export const initSuccess = createAction<IExpenseSetting[]>(INIT_SUCCESS);

export const save = createAction<IExpenseSetting>(SAVE);
export const saveSuccess = createAction<IExpenseSetting>(SAVE_SUCCESS);
export const saveFailure = createAction<Error>(SAVE_FAILURE);

export const add = createAction<IExpenseSetting>(ADD);
export const addSuccess = createAction<IExpenseSetting>(ADD_SUCCESS);
export const addFailure = createAction<Error>(ADD_FAILURE);

export const remove = createAction<IExpenseSetting>(REMOVE);
export const removeSuccess = createAction<IExpenseSetting>(REMOVE_SUCCESS);
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
