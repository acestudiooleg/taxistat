import moment from 'moment';
import { put, takeLatest } from 'redux-saga/effects';
import settingsActions, { INIT, ISettingsData } from '../actions/settings';
import taxiServicesActions from '../actions/taxi-services';
import expensesSettingsActions from '../actions/expenses-settings';
import expensesActions from '../actions/expenses';
import ridesActions from '../actions/rides';
import {
  predefinedServices,
  predefinedExpenses,
  predefinedFuel,
  IService,
  IExpense,
  IExpenseSetting,
  IRide,
  IRecord,
} from '../constants';
import db from '../db';
import { getCurrency, getDistanceName } from '../components/LangSwitch';
import i18n from '../i18n';

const filterByCurrentMonth = (row: IRecord) => moment(row.timestamp).isSame(moment(), 'month');

interface IInitSettings {
  settings: ISettingsData;
  services: IService[];
  expensesSettings: IExpenseSetting[];
  expenses?: IExpense[];
  rides?: IRide[];
}

function* save(settingsData: IInitSettings) {
  const settings = yield db.settings.create(settingsData.settings);
  const services = yield db.services.create(settingsData.services);
  const expensesSettings = yield db.expensesSettings.create(settingsData.expensesSettings);
  return {
    settings: (settings && settings[0]) || {},
    services,
    expensesSettings,
  };
}

function* read() {
  const settings = yield db.settings.read();
  const services = yield db.services.read();
  const expensesSettings = yield db.expensesSettings.read();
  const expenses = yield db.expenses.read({ query: filterByCurrentMonth });
  const rides = yield db.rides.read({ query: filterByCurrentMonth });
  return {
    settings: (settings && settings[0]) || {},
    services,
    expensesSettings,
    expenses,
    rides,
  };
}

function* putToStore(settingsData: IInitSettings) {
  yield put(settingsActions.initSuccess(settingsData.settings));
  yield put(taxiServicesActions.initSuccess(settingsData.services));
  yield put(expensesSettingsActions.initSuccess(settingsData.expensesSettings));
  yield put(expensesActions.initSuccess(settingsData.expenses || []));
  yield put(ridesActions.initSuccess(settingsData.rides || []));
}

function* init() {
  try {
    const [maybeSettings] = yield db.settings.read();

    if (!maybeSettings) {
      const settings = {
        initialized: true,
        done: false,
        lang: 'en',
        distanceName: getDistanceName(),
        currency: getCurrency(),
        timePriceEnabled: false,
        timePrice: 0,
        taxiDriver: true,
        fuelPrice: predefinedFuel.price,
        fuelConsumption: predefinedFuel.consumption,
        activeStep: 0,
      };

      const data = yield save({
        settings,
        services: predefinedServices,
        expensesSettings: predefinedExpenses.map(el => ({ ...el, name: i18n.t(el.name) })),
      });

      yield putToStore(data);
    } else {
      const data = yield read();
      yield putToStore(data);
    }
  } catch (error) {
    yield put(settingsActions.initFailure(error));
  }
}

export default function* initSaga() {
  yield takeLatest(INIT, init);
}
