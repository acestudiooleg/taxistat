import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import actions, { SAVE, INIT } from '../actions/settings';
import { predefinedServices, predefinedExpenses, predefinedFuel } from '../constants';
import db from '../db';

function* readSettings() {
  const [settings] = yield db.settings.read();
  const services = yield db.services.read();
  const expenses = yield db.expenses.read();
  return {
    ...settings,
    services,
    expenses,
  };
}
function* saveSettings({
  payload: {
    expenses, fuelPrice, fuelConsumption, services, activeStep,
  },
}) {
  try {
    const settings = yield readSettings();
    yield put(actions.saveSuccess(settings));
    const data = {
      fuelPrice,
      expenses,
      fuelConsumption,
      services,
      activeStep,
    };

    yield db.settings.update({
      ID: 1,
      fuelPrice,
      fuelConsumption,
      activeStep,
    });
    yield db.services.update(services);
    yield db.expenses.update(expenses);

    yield put(actions.saveSuccess(data));
  } catch (err) {
    yield put(actions.saveFailure({ error: 'error' }));
  }
}
function* initSettings() {
  try {
    const [maybeSettings] = yield db.settings.read();
    if (!maybeSettings) {
      const settings = {
        initialized: true,
        done: false,
        fuelPrice: predefinedFuel.price,
        fuelConsumption: predefinedFuel.consumption,
        activeStep: 0,
      };

      yield db.settings.create(settings);
      yield db.services.create(predefinedServices);
      yield db.expenses.create(predefinedExpenses);
      yield put(
        actions.saveSuccess({
          ...settings,
          services: predefinedServices,
          expenses: predefinedExpenses,
        }),
      );
    } else {
      const settings = yield readSettings();
      yield put(actions.saveSuccess(settings));
    }
  } catch (error) {
    yield put(actions.saveFailure({ error }));
  }
}

export default function* settingsSaga() {
  yield takeEvery(SAVE, saveSettings);
  yield takeLatest(INIT, initSettings);
}
