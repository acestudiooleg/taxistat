import moment from 'moment';
import { put, takeLatest } from 'redux-saga/effects';
import settingsActions, { INIT } from '../actions/settings';
import taxiServicesActions from '../actions/taxiServices';
import expensesSettingsActions from '../actions/expensesSettings';
import expensesActions from '../actions/expenses';
import ridesActions from '../actions/rides';
import { predefinedServices, predefinedExpenses, predefinedFuel } from '../constants';
import db from '../db';
import { getCurrency } from '../components/LangSwitch';

const filterByCurrentMonth = row => moment(row.timestamp).isSame(moment(), 'month');

function* save(settingsData) {
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

function* putToStore(settingsData) {
  yield put(settingsActions.initSuccess(settingsData.settings));
  yield put(taxiServicesActions.initSuccess(settingsData.services));
  yield put(expensesSettingsActions.initSuccess(settingsData.expensesSettings));
  yield put(expensesActions.initSuccess(settingsData.expenses));
  yield put(ridesActions.initSuccess(settingsData.rides));
}

function* init() {
  try {
    const [maybeSettings] = yield db.settings.read();

    if (!maybeSettings) {
      const settings = {
        initialized: true,
        done: false,
        currency: getCurrency(),
        taxiDriver: true,
        fuelPrice: predefinedFuel.price,
        fuelConsumption: predefinedFuel.consumption,
        activeStep: 0,
      };

      const data = yield save({
        settings,
        services: predefinedServices,
        expensesSettings: predefinedExpenses,
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
