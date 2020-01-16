import createReducer from '../utils/redux-create-reducer';
import { SAVE, SAVE_SUCCESS, ADD_SUCCESS, INIT_SUCCESS, SAVE_FAILURE } from '../actions/expenses-settings';
import { IExpenseSetting } from '../constants';

export interface IExpensesSettings {
  hasData?: boolean;
  isLoading?: boolean;
  list: IExpenseSetting[];
  error?: Error;
}

interface IState {
  expensesSettings: IExpensesSettings;
}

export const initialState: IExpensesSettings = {
  hasData: false,
  isLoading: false,
  list: [],
};

export const getExpensesSettings = (state: IState): IExpensesSettings => state.expensesSettings;

const save = (list: IExpenseSetting[]) => ({ list, loading: false, hasData: true });

export default createReducer(initialState, {
  [SAVE]: () => ({ loading: true }),
  [ADD_SUCCESS]: save,
  [SAVE_SUCCESS]: save,
  [INIT_SUCCESS]: save,
  [SAVE_FAILURE]: error => ({ error, loading: false, hasData: true }),
});
