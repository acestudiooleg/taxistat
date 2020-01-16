import { createAction, createEmptyAction } from '../utils/actions';

export interface IBackupData {
  [key: string]: any;
}

export const GENERATE = 'BACKUP/GENERATE';
export const GENERATE_SUCCESS = 'BACKUP/GENERATE_SUCCESS';
export const GENERATE_FAILURE = 'BACKUP/GENERATE_FAILURE';

export const RESTORE = 'BACKUP/RESTORE';
export const RESTORE_SUCCESS = 'BACKUP/RESTORE_SUCCESS';
export const RESTORE_FAILURE = 'BACKUP/RESTORE_FAILURE';

export const REMOVE_ALL = 'BACKUP/REMOVE_ALL';
export const RESET = 'BACKUP/RESET';

export const types = {
  GENERATE,
  GENERATE_SUCCESS,
  GENERATE_FAILURE,
  RESTORE,
  RESTORE_SUCCESS,
  RESTORE_FAILURE,
  REMOVE_ALL,
  RESET,
};

export const reset = createEmptyAction(RESET);
export const generate = createEmptyAction(GENERATE);
export const generateSuccess = createAction<IBackupData>(GENERATE_SUCCESS);
export const generateFailure = createAction<Error>(GENERATE_FAILURE);
export const restore = createEmptyAction(GENERATE);
export const restoreSuccess = createAction<IBackupData>(GENERATE_SUCCESS);
export const restoreFailure = createAction<Error>(GENERATE_FAILURE);

export default {
  reset,
  generate,
  generateSuccess,
  generateFailure,
  restore,
  restoreSuccess,
  restoreFailure,
};
