import { actionSeq, act, hasFunc, hasType } from '../utils/actions';
import expensesSettings, {
  FETCH_EXPENSES_SETTINGS,
  FETCH_EXPENSES_SETTINGS_SUCCESS,
  FETCH_EXPENSES_SETTINGS_FAILURE,
  fetch,
  fetchSuccess,
  fetchFailure,
  types,
} from './expenses-settings';

describe(
  'Actions ExpensesSettings - test case',
  actionSeq(expensesSettings, types, [
    act(FETCH_EXPENSES_SETTINGS, fetch),
    act(FETCH_EXPENSES_SETTINGS_SUCCESS, fetchSuccess, true),
    act(FETCH_EXPENSES_SETTINGS_FAILURE, fetchFailure, true),
    hasType(FETCH_EXPENSES_SETTINGS, FETCH_EXPENSES_SETTINGS_SUCCESS, FETCH_EXPENSES_SETTINGS_FAILURE),
    hasFunc(fetch, fetchSuccess, fetchFailure),
  ]),
);
