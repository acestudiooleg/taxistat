import { actionSeq, act, hasFunc, hasType } from '../utils/actions';
import settings, {
  FETCH_SETTINGS,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_FAILURE,
  fetch,
  fetchSuccess,
  fetchFailure,
  types,
} from './settings';

describe(
  'Actions Settings - test case',
  actionSeq(settings, types, [
    act(FETCH_SETTINGS, fetch),
    act(FETCH_SETTINGS_SUCCESS, fetchSuccess, true),
    act(FETCH_SETTINGS_FAILURE, fetchFailure, true),
    hasType(FETCH_SETTINGS, FETCH_SETTINGS_SUCCESS, FETCH_SETTINGS_FAILURE),
    hasFunc(fetch, fetchSuccess, fetchFailure),
  ]),
);
