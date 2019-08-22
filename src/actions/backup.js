import { createDataAction, createErrorAction } from '../helpers';

export const SAVE = 'backup/SAVE';
export const SAVE_SUCCESS = 'backup/SAVE_SUCCESS';
export const SAVE_FAILURE = 'backup/SAVE_FAILURE';

export const RESTORE = 'backup/RESTORE';
export const RESTORE_SUCCESS = 'backup/RESTORE_SUCCESS';
export const RESTORE_FAILURE = 'backup/RESTORE_FAILURE';

export const types = {
  SAVE,
  SAVE_SUCCESS,
  SAVE_FAILURE,

  RESTORE,
  RESTORE_SUCCESS,
  RESTORE_FAILURE,
};

export default {
  save: createDataAction(SAVE),
  saveSuccess: createDataAction(SAVE_SUCCESS),
  saveFailure: createErrorAction(SAVE_FAILURE),

  restore: createDataAction(RESTORE),
  restoreSuccess: createDataAction(RESTORE_SUCCESS),
  restoreFailure: createErrorAction(RESTORE_FAILURE),
};
