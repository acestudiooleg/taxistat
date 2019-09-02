import { put, takeEvery, select } from 'redux-saga/effects';
import find from 'lodash/find';
import actions, { SAVE, ADD, REMOVE } from '../actions/rides';
import db from '../db';
import { getTaxiServices } from '../reducers/taxiServices';
import { goToBalance } from '../router';

export function* read(q) {
  return yield db.rides.read(q);
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
    const services = yield select(getTaxiServices);
    const service = find(services.list, { ID: payload.serviceId });
    const data = yield db.rides.create({
      ...payload,
      timestamp: payload.timestamp.toISOString(),
      serviceName: service.name,
    });

    yield put(actions.addSuccess(data));
    yield goToBalance(put);
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
