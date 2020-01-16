import { IAction } from '../utils/redux-create-reducer';
import { put, takeEvery, select } from 'redux-saga/effects';
import find from 'lodash/find';
import actions, { SAVE, ADD, REMOVE } from '../actions/rides';
import db, { IReq } from '../db';
import { getTaxiServices } from '../reducers/taxi-services';
import { goToBalance, goToStatistics } from '../router';

export function* read(req: IReq) {
  return yield db.rides.read(req);
}

export function* save({ payload: ride }: IAction) {
  try {
    const data = yield db.rides.update(ride);

    yield put(actions.saveSuccess(data));
    yield goToStatistics(put);
  } catch (error) {
    yield put(actions.saveFailure(error));
  }
}

export function* add({ payload }: IAction) {
  try {
    const services = yield select(getTaxiServices);
    const service = find(services.list, { ID: Number(payload.serviceId) });
    const data = yield db.rides.create({
      ...payload,
      timestamp: payload.timestamp.toISOString(true),
      serviceName: service.name,
    });

    yield put(actions.addSuccess(data));
    yield goToBalance(put);
  } catch (error) {
    yield put(actions.addFailure(error));
  }
}

export function* remove({ payload }: IAction) {
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
