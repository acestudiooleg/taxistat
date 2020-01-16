import { IAction } from '../utils/redux-create-reducer';
import { put, takeEvery } from 'redux-saga/effects';
import actions, { SAVE, ADD, REMOVE } from '../actions/expenses';
import db, { IReq } from '../db';

import { goToBalance } from '../router';

export function* read(req: IReq) {
  return yield db.expenses.read(req);
}

export function* save({ payload: expense }: IAction) {
  try {
    const data = yield db.expenses.update(expense);

    yield put(actions.saveSuccess(data));
  } catch (error) {
    yield put(actions.saveFailure(error));
  }
}

export function* add({ payload }: IAction) {
  try {
    const data = yield db.expenses.create({
      ...payload,
      timestamp: new Date().toISOString(),
    });

    yield put(actions.addSuccess(data));
    yield goToBalance(put);
  } catch (error) {
    yield put(actions.addFailure(error));
  }
}

export function* remove({ payload }: IAction) {
  try {
    const data = yield db.expenses.delete(payload);

    yield put(actions.removeSuccess(data));
  } catch (error) {
    yield put(actions.removeFailure(error));
  }
}

export default function* expensesSaga() {
  yield takeEvery(SAVE, save);
  yield takeEvery(ADD, add);
  yield takeEvery(REMOVE, remove);
}
