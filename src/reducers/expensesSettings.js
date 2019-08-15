import { createReducer } from '../helpers';
import {
  SAVE, SAVE_SUCCESS, ADD_SUCCESS, INIT_SUCCESS, SAVE_FAILURE,
} from '../actions/expensesSettings';

const initialState = {
  hasData: false,
  loading: false,
  list: [],
  errot: null,
};

export const getExpensesSettings = ({ expensesSettings }) => expensesSettings;

const save = ({ payload: list }) => ({ list, loading: false, hasData: true });

export default createReducer(initialState, {
  [SAVE]: () => ({ loading: true }),
  [ADD_SUCCESS]: save,
  [SAVE_SUCCESS]: save,
  [INIT_SUCCESS]: save,
  [SAVE_FAILURE]: ({ payload: error }) => ({ error, loading: false, hasData: true }),
});
