import backup, { initialState, getBackup } from './backup';
import { testReducer, cs } from '../utils/reducer';
import { fetch, fetchSuccess, fetchFailure } from '../actions/backup';

const err = new Error('error backup');

const data = { body: 'hello backup' };

describe(
  'Backup reducer',
  testReducer(backup, initialState, [
    cs('should fetch', fetch(), { isLoading: true }),
    cs(
      'should fetch success',
      fetchSuccess({ body: 'hello backup' }),
      { data },
      { ...initialState, isLoading: true },
    ),
    cs('should fetch failure', fetchFailure(err), { error: err }),
  ]),
);

test('getBackup getter should return correct value', () => {
  const state = {
    backup: {
      isLoading: true,
      data,
    },
  };
  expect(getBackup(state)).toEqual(state.backup);
});
