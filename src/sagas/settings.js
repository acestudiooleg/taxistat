import { put, takeEvery } from 'redux-saga/effects';
import actions, { SAVE } from '../actions/settings';
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

export default function* settingsSaga() {
  yield takeEvery(SAVE, saveSettings);
}
