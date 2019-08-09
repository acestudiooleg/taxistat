import { createReducer } from '../helpers';
import { SAVE, SAVE_SUCCESS, SAVE_FAILURE } from '../actions/settings';

const initialState = {
  init: false,
  loading: false,
  activeStep: 0,
  fuel: {},
  services: {},
  expenses: {},
  error: null,
};

export const getSettings = ({ settings }) => settings;

export default createReducer(initialState, {
  [SAVE]: () => ({ loading: true }),
  [SAVE_SUCCESS]: ({ payload }, state) => ({ ...state, ...payload, loading: false }),
  [SAVE_FAILURE]: ({ payload }) => ({ error: payload, loading: false }),
});
