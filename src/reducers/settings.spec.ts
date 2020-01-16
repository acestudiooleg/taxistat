import settings, { initialState, getSettings } from './settings';
import { testReducer, cs } from '../utils/reducer';
import { fetch, fetchSuccess, fetchFailure } from '../actions/settings';

const err = new Error('error settings');

const data = { body: 'hello settings' };

describe(
  'Settings reducer',
  testReducer(settings, initialState, [
    cs('should fetch', fetch(), { isLoading: true }),
    cs(
      'should fetch success',
      fetchSuccess({ body: 'hello settings' }),
      { data },
      { ...initialState, isLoading: true },
    ),
    cs('should fetch failure', fetchFailure(err), { error: err }),
  ]),
);

test('getSettings getter should return correct value', () => {
  const state = {
    settings: {
      isLoading: true,
      data,
    },
  };
  expect(getSettings(state)).toEqual(state.settings);
});
