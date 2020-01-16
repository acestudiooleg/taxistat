import createReducer from '../utils/redux-create-reducer';
import { SAVE, SAVE_SUCCESS, INIT_SUCCESS, ADD_SUCCESS, SAVE_FAILURE } from '../actions/expenses';
import { IExpense } from '../constants';

export interface IExpenses {
  hasData?: boolean;
  loading?: boolean;
  list: IExpense[];
  error?: Error;
}

interface IState {
  expenses: IExpenses;
}

export const initialState: IExpenses = {
  hasData: false,
  loading: false,
  list: [],
};

export const getExpenses = (state: IState): IExpenses => state.expenses;

const save = (list: IExpense[]) => ({ list, loading: false, hasData: true });

export default createReducer(initialState, {
  [SAVE]: () => ({ loading: true }),
  [ADD_SUCCESS]: save,
  [SAVE_SUCCESS]: save,
  [INIT_SUCCESS]: save,
  [SAVE_FAILURE]: (error: Error) => ({ error, loading: false, hasData: true }),
});
