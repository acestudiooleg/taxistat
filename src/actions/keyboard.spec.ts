import { actionSeq, act, hasFunc, hasType } from '../utils/actions';
import keyboard, {
  FETCH_KEYBOARD,
  FETCH_KEYBOARD_SUCCESS,
  FETCH_KEYBOARD_FAILURE,
  fetch,
  fetchSuccess,
  fetchFailure,
  types,
} from './keyboard';

describe(
  'Actions Keyboard - test case',
  actionSeq(keyboard, types, [
    act(FETCH_KEYBOARD, fetch),
    act(FETCH_KEYBOARD_SUCCESS, fetchSuccess, true),
    act(FETCH_KEYBOARD_FAILURE, fetchFailure, true),
    hasType(FETCH_KEYBOARD, FETCH_KEYBOARD_SUCCESS, FETCH_KEYBOARD_FAILURE),
    hasFunc(fetch, fetchSuccess, fetchFailure),
  ]),
);
