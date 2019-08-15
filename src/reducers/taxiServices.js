import { createReducer } from '../helpers';
import {
  SAVE, SAVE_SUCCESS, INIT_SUCCESS, ADD_SUCCESS, SAVE_FAILURE,
} from '../actions/taxiServices';

const initialState = {
  hasData: false,
  loading: false,
  list: [],
  error: null,
};

export const getTaxiServices = ({ taxiServices }) => taxiServices;

const save = ({ payload: list }) => ({ list, loading: false, hasData: true });

export default createReducer(initialState, {
  [SAVE]: () => ({ loading: true }),
  [ADD_SUCCESS]: save,
  [SAVE_SUCCESS]: save,
  [INIT_SUCCESS]: save,
  [SAVE_FAILURE]: ({ payload: error }) => ({ error, loading: false, hasData: true }),
});
