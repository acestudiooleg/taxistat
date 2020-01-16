import { actionSeq, act, hasFunc, hasType } from '../utils/actions';
import rides, {
  FETCH_RIDES,
  FETCH_RIDES_SUCCESS,
  FETCH_RIDES_FAILURE,
  fetch,
  fetchSuccess,
  fetchFailure,
  types,
} from './rides';

describe(
  'Actions Rides - test case',
  actionSeq(rides, types, [
    act(FETCH_RIDES, fetch),
    act(FETCH_RIDES_SUCCESS, fetchSuccess, true),
    act(FETCH_RIDES_FAILURE, fetchFailure, true),
    hasType(FETCH_RIDES, FETCH_RIDES_SUCCESS, FETCH_RIDES_FAILURE),
    hasFunc(fetch, fetchSuccess, fetchFailure),
  ]),
);
