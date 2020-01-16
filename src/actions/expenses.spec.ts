import { actionSeq, act, hasFunc, hasType } from '../utils/actions';
import expenses, {
  FETCH_EXPENSES,
  FETCH_EXPENSES_SUCCESS,
  FETCH_EXPENSES_FAILURE,
  fetch,
  fetchSuccess,
  fetchFailure,
  types,
} from './expenses';

describe(
  'Actions Expenses - test case',
  actionSeq(expenses, types, [
    act(FETCH_EXPENSES, fetch),
    act(FETCH_EXPENSES_SUCCESS, fetchSuccess, true),
    act(FETCH_EXPENSES_FAILURE, fetchFailure, true),
    hasType(FETCH_EXPENSES, FETCH_EXPENSES_SUCCESS, FETCH_EXPENSES_FAILURE),
    hasFunc(fetch, fetchSuccess, fetchFailure),
  ]),
);
