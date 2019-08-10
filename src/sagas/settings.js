import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import actions, { SAVE, INIT } from '../actions/settings';
import { predefinedServices, predefinedExpenses, predefinedFuel } from '../constants';
import db from '../db';

function* saveSettings({
  payload: {
    init, expenses, fuel, services, activeStep,
  },
}) {
  try {
    const data = yield db.settings.read();
    console.log(data);
    // yield db.settings.create({
    //   init: false,
    //   expenses,
    //   fuel,
    //   services,
    //   activeStep,
    // });
    yield put(
      actions.saveSuccess({
        init,
        expenses,
        fuel,
        services,
        activeStep,
      }),
    );
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
      const services = yield db.services.read();
      const expenses = yield db.expenses.read();
      yield put(
        actions.saveSuccess({
          ...maybeSettings,
          services,
          expenses,
        }),
      );
    }
  } catch (error) {
    yield put(actions.saveFailure({ error }));
  }
}

export default function* settingsSaga() {
  yield takeEvery(SAVE, saveSettings);
  yield takeLatest(INIT, initSettings);
}
