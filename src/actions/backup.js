import { createEmptyAction, createDataAction, createErrorAction } from '../helpers';

export const GENERATE = 'backup/GENERATE';
export const GENERATE_SUCCESS = 'backup/GENERATE_SUCCESS';
export const GENERATE_FAILURE = 'backup/GENERATE_FAILURE';

export const RESET = 'backup/RESET';

export const RESTORE = 'backup/RESTORE';
export const RESTORE_SUCCESS = 'backup/RESTORE_SUCCESS';
export const RESTORE_FAILURE = 'backup/RESTORE_FAILURE';

export const REMOVE_ALL = 'backup/REMOVE_ALL';

export const types = {
  GENERATE,
  GENERATE_SUCCESS,
  GENERATE_FAILURE,

  RESTORE,
  RESTORE_SUCCESS,
  RESTORE_FAILURE,
};

export default {
  generate: createDataAction(GENERATE),
  generateSuccess: createDataAction(GENERATE_SUCCESS),
  generateFailure: createErrorAction(GENERATE_FAILURE),

  restore: createDataAction(RESTORE),
  restoreSuccess: createDataAction(RESTORE_SUCCESS),
  restoreFailure: createErrorAction(RESTORE_FAILURE),

  removeAll: createEmptyAction(REMOVE_ALL),
};
