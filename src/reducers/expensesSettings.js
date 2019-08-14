import { createReducer } from '../helpers';
import { SAVE, SAVE_SUCCESS, SAVE_FAILURE } from '../actions/expensesSettings';

const initialState = {
  loading: false,
  list: [],
  errot: null,
};

export const getExpensesSettings = ({ expensesSettings }) => expensesSettings;

export default createReducer(initialState, {
  [SAVE]: () => ({ loading: true }),
  [SAVE_SUCCESS]: ({ payload: list }) => ({ list, loading: false }),
  [SAVE_FAILURE]: ({ payload: error }) => ({ error, loading: false }),
});
