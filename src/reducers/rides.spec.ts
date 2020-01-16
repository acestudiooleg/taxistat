import rides, { initialState, getRides } from './rides';
import { testReducer, cs } from '../utils/reducer';
import { fetch, fetchSuccess, fetchFailure } from '../actions/rides';

const err = new Error('error rides');

const data = { body: 'hello rides' };

describe(
  'Rides reducer',
  testReducer(rides, initialState, [
    cs('should fetch', fetch(), { isLoading: true }),
    cs(
      'should fetch success',
      fetchSuccess({ body: 'hello rides' }),
      { data },
      { ...initialState, isLoading: true },
    ),
    cs('should fetch failure', fetchFailure(err), { error: err }),
  ]),
);

test('getRides getter should return correct value', () => {
  const state = {
    rides: {
      isLoading: true,
      data,
    },
  };
  expect(getRides(state)).toEqual(state.rides);
});
