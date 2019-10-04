import { createReducer } from '../helpers';
import {
  GENERATE, GENERATE_SUCCESS, GENERATE_FAILURE, RESET,
} from '../actions/backup';

const initialState = {
  hasData: false,
  loading: false,
  database: {},
  error: null,
};

export const getBackup = ({ backup }) => backup;

export default createReducer(initialState, {
  [RESET]: () => ({ hasData: false }),
  [GENERATE]: () => ({ loading: true }),
  [GENERATE_SUCCESS]: ({ payload: database }) => ({ database, loading: false, hasData: true }),
  [GENERATE_FAILURE]: ({ payload: error }) => ({ error, loading: false, hasData: true }),
});
