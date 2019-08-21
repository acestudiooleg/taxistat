import { createReducer } from '../helpers';
import { SAVE, SAVE_SUCCESS, SAVE_FAILURE } from '../actions/backup';

const initialState = {
  hasData: false,
  loading: false,
  database: {},
  error: null,
};

export const getBackup = ({ backup }) => backup;

export default createReducer(initialState, {
  [SAVE]: () => ({ loading: true }),
  [SAVE_SUCCESS]: ({ payload: database }) => ({ database, loading: false, hasData: true }),
  [SAVE_FAILURE]: ({ payload: error }) => ({ error, loading: false, hasData: true }),
});
