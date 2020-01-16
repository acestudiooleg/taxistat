import taxiServices, { initialState, getTaxiServices } from './taxi-services';
import { testReducer, cs } from '../utils/reducer';
import { fetch, fetchSuccess, fetchFailure } from '../actions/taxi-services';

const err = new Error('error taxi-services');

const data = { body: 'hello taxi-services' };

describe(
  'TaxiServices reducer',
  testReducer(taxiServices, initialState, [
    cs('should fetch', fetch(), { isLoading: true }),
    cs(
      'should fetch success',
      fetchSuccess({ body: 'hello taxi-services' }),
      { data },
      { ...initialState, isLoading: true },
    ),
    cs('should fetch failure', fetchFailure(err), { error: err }),
  ]),
);

test('getTaxiServices getter should return correct value', () => {
  const state = {
    taxiServices: {
      isLoading: true,
      data,
    },
  };
  expect(getTaxiServices(state)).toEqual(state.taxiServices);
});
