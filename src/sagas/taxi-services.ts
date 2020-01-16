import { IAction } from '../utils/redux-create-reducer';
import { put, takeEvery } from 'redux-saga/effects';
import actions, { SAVE, ADD, REMOVE } from '../actions/taxi-services';
import db, { IReq } from '../db';

export function* read(req: IReq) {
  return yield db.services.read(req);
}

export function* save({ payload: services }: IAction) {
  try {
    const data = yield db.services.update(services);

    yield put(actions.saveSuccess(data));
  } catch (error) {
    yield put(actions.saveFailure({ error }));
  }
}

export function* add({ payload }: IAction) {
  try {
    const data = yield db.services.create(payload);

    yield put(actions.addSuccess(data));
  } catch (error) {
    yield put(actions.addFailure(error));
  }
}

export function* remove({ payload }: IAction) {
  try {
    const data = yield db.services.delete(payload);

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
