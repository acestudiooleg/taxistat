import { put, takeEvery } from 'redux-saga/effects';
import { goToBalance } from '../router';

import actions, { SAVE, RESTORE, REMOVE_ALL } from '../actions/backup';
import settingsActions from '../actions/settings';
import db from '../db';

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
    yield goToBalance(put);
  } catch (error) {
    yield put(actions.restoreFailure(error));
  }
}

export function* removeAll() {
  try {
    yield db.removeAll();
    window.location.reload();
  } catch (error) {
    yield put(actions.restoreFailure(error));
  }
}

export default function* backupSaga() {
  yield takeEvery(SAVE, save);
  yield takeEvery(RESTORE, restore);
  yield takeEvery(REMOVE_ALL, removeAll);
}
