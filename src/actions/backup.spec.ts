import { actionSeq, act, hasFunc, hasType } from '../utils/actions';
import backup, {
  FETCH_BACKUP,
  FETCH_BACKUP_SUCCESS,
  FETCH_BACKUP_FAILURE,
  fetch,
  fetchSuccess,
  fetchFailure,
  types,
} from './backup';

describe(
  'Actions Backup - test case',
  actionSeq(backup, types, [
    act(FETCH_BACKUP, fetch),
    act(FETCH_BACKUP_SUCCESS, fetchSuccess, true),
    act(FETCH_BACKUP_FAILURE, fetchFailure, true),
    hasType(FETCH_BACKUP, FETCH_BACKUP_SUCCESS, FETCH_BACKUP_FAILURE),
    hasFunc(fetch, fetchSuccess, fetchFailure),
  ]),
);
