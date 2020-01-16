import expensesSettings, { initialState, getExpensesSettings } from './expenses-settings';
import { testReducer, cs } from '../utils/reducer';
import { fetch, fetchSuccess, fetchFailure } from '../actions/expenses-settings';

const err = new Error('error expenses-settings');

const data = { body: 'hello expenses-settings' };

describe(
  'ExpensesSettings reducer',
  testReducer(expensesSettings, initialState, [
    cs('should fetch', fetch(), { isLoading: true }),
    cs(
      'should fetch success',
      fetchSuccess({ body: 'hello expenses-settings' }),
      { data },
      { ...initialState, isLoading: true },
    ),
    cs('should fetch failure', fetchFailure(err), { error: err }),
  ]),
);

test('getExpensesSettings getter should return correct value', () => {
  const state = {
    expensesSettings: {
      isLoading: true,
      data,
    },
  };
  expect(getExpensesSettings(state)).toEqual(state.expensesSettings);
});
