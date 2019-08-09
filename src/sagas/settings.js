import { put, takeEvery } from 'redux-saga/effects';
import actions, { SAVE } from '../actions/settings';

function* saveSettings({
  payload: {
    init, expenses, fuel, services, activeStep,
  },
}) {
  try {
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
