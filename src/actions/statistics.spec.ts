import { actionSeq, act, hasFunc, hasType } from '../utils/actions';
import statistics, {
  FETCH_STATISTICS,
  FETCH_STATISTICS_SUCCESS,
  FETCH_STATISTICS_FAILURE,
  fetch,
  fetchSuccess,
  fetchFailure,
  types,
} from './statistics';

describe(
  'Actions Statistics - test case',
  actionSeq(statistics, types, [
    act(FETCH_STATISTICS, fetch),
    act(FETCH_STATISTICS_SUCCESS, fetchSuccess, true),
    act(FETCH_STATISTICS_FAILURE, fetchFailure, true),
    hasType(FETCH_STATISTICS, FETCH_STATISTICS_SUCCESS, FETCH_STATISTICS_FAILURE),
    hasFunc(fetch, fetchSuccess, fetchFailure),
  ]),
);
