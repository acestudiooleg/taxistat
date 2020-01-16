import createReducer from '../utils/redux-create-reducer';
import { getCurrency, getDistanceName } from '../components/LangSwitch';
import { Langs } from '../i18n';
import { SAVE, SAVE_SUCCESS, INIT_SUCCESS, SAVE_FAILURE, ISettingsData } from '../actions/settings';

export interface ISettings extends ISettingsData {
  hasData?: boolean;
  loading?: boolean;
  error?: Error;
}

interface IState {
  settings: ISettings;
}

const initialState: ISettings = {
  hasData: false,
  fuelConsumption: 0,
  fuelPrice: 0,
  lang: Langs.EN,
  timePrice: 0,
  timePriceEnabled: false,
  initialized: false,
  taxiDriver: true,
  distanceName: getDistanceName(),
  currency: getCurrency(),
  done: false,
  loading: false,
  activeStep: 0,
};

export const getSettings = (state: IState): ISettings => state.settings;

export default createReducer(initialState, {
  [SAVE]: () => ({ loading: true }),
  [SAVE_SUCCESS]: (payload, state) => ({
    ...state,
    ...payload,
    loading: false,
    hasData: true,
  }),
  [INIT_SUCCESS]: (payload, state) => ({
    ...state,
    ...payload,
    loading: false,
    hasData: true,
  }),
  [SAVE_FAILURE]: (error: Error) => ({ error, loading: false, hasData: true }),
});
