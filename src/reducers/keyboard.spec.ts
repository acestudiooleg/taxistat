import keyboard, { initialState, getKeyboard } from './keyboard';
import { testReducer, cs } from '../utils/reducer';
import { fetch, fetchSuccess, fetchFailure } from '../actions/keyboard';

const err = new Error('error keyboard');

const data = { body: 'hello keyboard' };

describe(
  'Keyboard reducer',
  testReducer(keyboard, initialState, [
    cs('should fetch', fetch(), { isLoading: true }),
    cs(
      'should fetch success',
      fetchSuccess({ body: 'hello keyboard' }),
      { data },
      { ...initialState, isLoading: true },
    ),
    cs('should fetch failure', fetchFailure(err), { error: err }),
  ]),
);

test('getKeyboard getter should return correct value', () => {
  const state = {
    keyboard: {
      isLoading: true,
      data,
    },
  };
  expect(getKeyboard(state)).toEqual(state.keyboard);
});
