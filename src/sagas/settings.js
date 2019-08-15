import { put, takeEvery, select } from 'redux-saga/effects';
import pick from 'lodash/pick';
import actions, { SAVE } from '../actions/settings';
import db, { settingsModel } from '../db';
import { getSettings } from '../reducers/settings';

export function* read() {
  return yield db.settings.read();
}

export function* save({ payload }) {
  try {
    const settings = yield select(getSettings);

    const [data] = yield db.settings.update({
      ID: settings.ID,
      ...pick(settings, settingsModel),
      ...pick(payload, settingsModel),
    });

    yield put(actions.saveSuccess(data));
  } catch (error) {
    yield put(actions.saveFailure(error));
  }
}

export default function* settingsSaga() {
  yield takeEvery(SAVE, save);
}
