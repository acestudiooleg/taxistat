import createReducer from '../utils/redux-create-reducer';
import { RESET, GENERATE, GENERATE_SUCCESS, GENERATE_FAILURE, IBackupData } from '../actions/backup';

export interface IBackup {
  hasData?: boolean;
  loading?: boolean;
  database: IBackupData | null;
  error?: Error;
}

interface IState {
  backup: IBackup;
}

export const initialState: IBackup = {
  hasData: false,
  loading: false,
  database: null,
};

export const getBackup = (state: IState): IBackup => state.backup;

export default createReducer(initialState, {
  [RESET]: () => ({ hasData: false }),
  [GENERATE]: () => ({ loading: true }),
  [GENERATE_SUCCESS]: database => ({ database, loading: false, hasData: true }),
  [GENERATE_FAILURE]: error => ({ error, loading: false, hasData: true }),
});
