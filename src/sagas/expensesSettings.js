import { put, takeEvery } from 'redux-saga/effects';
import actions, { SAVE } from '../actions/expensesSettings';
import db from '../db';

export function* read() {
  return yield db.services.read();
}

export function* save({ payload: services }) {
  try {
    const data = yield db.expenses.update(services);

    yield put(actions.saveSuccess(data));
  } catch (error) {
    yield put(actions.saveFailure({ error }));
  }
}

export default function* taxiServicesSaga() {
  yield takeEvery(SAVE, save);
}
