import { createReducer } from '../helpers';
import { SAVE, SAVE_SUCCESS, SAVE_FAILURE } from '../actions/taxiServices';

const initialState = {
  loading: false,
  list: [],
  error: null,
};

export const getTaxiServices = ({ taxiServices }) => taxiServices;

export default createReducer(initialState, {
  [SAVE]: () => ({ loading: true }),
  [SAVE_SUCCESS]: ({ payload: list }) => ({ list, loading: false }),
  [SAVE_FAILURE]: ({ payload: error }) => ({ error, loading: false }),
});
