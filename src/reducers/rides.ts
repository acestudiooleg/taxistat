import createReducer from '../utils/redux-create-reducer';
import { SAVE, SAVE_SUCCESS, INIT_SUCCESS, ADD_SUCCESS, SAVE_FAILURE } from '../actions/rides';
import { IRide } from '../constants';

export interface IRides {
  hasData?: boolean;
  loading?: boolean;
  list: IRide[];
  error?: Error;
}

interface IState {
  rides: IRides;
}

export const initialState: IRides = {
  hasData: false,
  loading: false,
  list: [],
};

export const getRides = (state: IState): IRides => state.rides;

const save = (list: IRide[]) => ({ list, loading: false, hasData: true });

export default createReducer(initialState, {
  [SAVE]: () => ({ loading: true }),
  [ADD_SUCCESS]: save,
  [SAVE_SUCCESS]: save,
  [INIT_SUCCESS]: save,
  [SAVE_FAILURE]: error => ({ error, loading: false, hasData: true }),
});
