import statistics, { initialState, getStatistics } from './statistics';
import { testReducer, cs } from '../utils/reducer';
import { fetch, fetchSuccess, fetchFailure } from '../actions/statistics';

const err = new Error('error statistics');

const data = { body: 'hello statistics' };

describe(
  'Statistics reducer',
  testReducer(statistics, initialState, [
    cs('should fetch', fetch(), { isLoading: true }),
    cs(
      'should fetch success',
      fetchSuccess({ body: 'hello statistics' }),
      { data },
      { ...initialState, isLoading: true },
    ),
    cs('should fetch failure', fetchFailure(err), { error: err }),
  ]),
);

test('getStatistics getter should return correct value', () => {
  const state = {
    statistics: {
      isLoading: true,
      data,
    },
  };
  expect(getStatistics(state)).toEqual(state.statistics);
});
