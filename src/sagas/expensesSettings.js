import { put, takeEvery } from 'redux-saga/effects';
import actions, { SAVE, ADD, REMOVE } from '../actions/expensesSettings';
import db from '../db';

export function* read() {
  return yield db.services.read();
}

export function* save({ payload: services }) {
  try {
    const data = yield db.expensesSettings.update(services);

    yield put(actions.saveSuccess(data));
  } catch (error) {
    yield put(actions.saveFailure({ error }));
  }
}

export function* add({ payload }) {
  try {
    const data = yield db.expensesSettings.create(payload);

    yield put(actions.addSuccess(data));
  } catch (error) {
    yield put(actions.addFailure(error));
  }
}

export function* remove({ payload }) {
  try {
    const data = yield db.expensesSettings.delete(payload);

    yield put(actions.removeSuccess(data));
  } catch (error) {
    yield put(actions.removeFailure(error));
  }
}

export default function* taxiServicesSaga() {
  yield takeEvery(SAVE, save);
  yield takeEvery(ADD, add);
  yield takeEvery(REMOVE, remove);
}
