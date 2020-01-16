import { IAction } from '../utils/redux-create-reducer';
import { put, takeEvery } from 'redux-saga/effects';
import actions, { SAVE, ADD, REMOVE } from '../actions/expenses-settings';
import db from '../db';
export function* save({ payload: services }: IAction) {
  try {
    const data = yield db.expensesSettings.update(services);

    yield put(actions.saveSuccess(data));
  } catch (error) {
    yield put(actions.saveFailure(error));
  }
}

export function* add({ payload }: IAction) {
  try {
    const data = yield db.expensesSettings.create(payload);

    yield put(actions.addSuccess(data));
  } catch (error) {
    yield put(actions.addFailure(error));
  }
}

export function* remove({ payload }: IAction) {
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
