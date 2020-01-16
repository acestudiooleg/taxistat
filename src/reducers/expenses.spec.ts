import expenses, { initialState, getExpenses } from './expenses';
import { testReducer, cs } from '../utils/reducer';
import { fetch, fetchSuccess, fetchFailure } from '../actions/expenses';

const err = new Error('error expenses');

const data = { body: 'hello expenses' };

describe(
  'Expenses reducer',
  testReducer(expenses, initialState, [
    cs('should fetch', fetch(), { isLoading: true }),
    cs(
      'should fetch success',
      fetchSuccess({ body: 'hello expenses' }),
      { data },
      { ...initialState, isLoading: true },
    ),
    cs('should fetch failure', fetchFailure(err), { error: err }),
  ]),
);

test('getExpenses getter should return correct value', () => {
  const state = {
    expenses: {
      isLoading: true,
      data,
    },
  };
  expect(getExpenses(state)).toEqual(state.expenses);
});
