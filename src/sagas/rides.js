import { put, takeEvery } from 'redux-saga/effects';
import actions, { SAVE, ADD, REMOVE } from '../actions/rides';
import db from '../db';

export function* read() {
  return yield db.rides.read();
}

export function* save({ payload: ride }) {
  try {
    const data = yield db.rides.update(ride);

    yield put(actions.saveSuccess(data));
  } catch (error) {
    yield put(actions.saveFailure({ error }));
  }
}

export function* add({ payload }) {
  try {
    const data = yield db.rides.create(payload);

    yield put(actions.addSuccess(data));
  } catch (error) {
    yield put(actions.addFailure(error));
  }
}

export function* remove({ payload }) {
  try {
    const data = yield db.rides.delete(payload);

    yield put(actions.removeSuccess(data));
  } catch (error) {
    yield put(actions.removeFailure(error));
  }
}

export default function* ridesSaga() {
  yield takeEvery(SAVE, save);
  yield takeEvery(ADD, add);
  yield takeEvery(REMOVE, remove);
}
