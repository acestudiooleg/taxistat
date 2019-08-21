import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import actions, { SAVE, RESTORE } from '../actions/backup';
import settingsActions from '../actions/settings';
import db from '../db';
import router from '../router';

export function* save() {
  try {
    const data = yield db.db.serialize();

    yield put(actions.saveSuccess(data));
  } catch (error) {
    yield put(actions.saveFailure({ error }));
  }
}

export function* restore({ payload: jsonFile }) {
  try {
    const data = JSON.parse(jsonFile);
    yield db.restore(jsonFile);

    yield put(actions.restoreSuccess(data));
    yield put(settingsActions.init());
    yield put(push(router.balance));
  } catch (error) {
    yield put(actions.restoreFailure(error));
  }
}

export default function* backupSaga() {
  yield takeEvery(SAVE, save);
  yield takeEvery(RESTORE, restore);
}
