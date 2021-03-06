import { createReducer } from '../helpers';
import {
  SAVE, SAVE_SUCCESS, INIT_SUCCESS, SAVE_FAILURE,
} from '../actions/settings';

import { getCurrency, getDistanceName } from '../components/LangSwitch';

const initialState = {
  hasData: false,
  fuelConsumption: 0,
  fuelPrice: 0,
  timePrice: 0,
  timePriceEnabled: false,
  initialized: false,
  taxiDriver: true,
  distanceName: getDistanceName(),
  currency: getCurrency(),
  done: false,
  loading: false,
  activeStep: 0,
  error: null,
};

export const getSettings = ({ settings }) => settings;

export default createReducer(initialState, {
  [SAVE]: () => ({ loading: true }),
  [SAVE_SUCCESS]: ({ payload }, state) => ({
    ...state,
    ...payload,
    loading: false,
    hasData: true,
  }),
  [INIT_SUCCESS]: ({ payload }, state) => ({
    ...state,
    ...payload,
    loading: false,
    hasData: true,
  }),
  [SAVE_FAILURE]: ({ payload }) => ({ error: payload, loading: false, hasData: true }),
});
