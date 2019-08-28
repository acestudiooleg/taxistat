import { put, takeEvery } from 'redux-saga/effects';
import actions, { SAVE, ADD, REMOVE } from '../actions/expenses';
import db from '../db';

import { goToBalance } from '../router';

export function* read(q) {
  return yield db.expenses.read(q);
}

export function* save({ payload: expense }) {
  try {
    const data = yield db.expenses.update(expense);

    yield put(actions.saveSuccess(data));
  } catch (error) {
    yield put(actions.saveFailure({ error }));
  }
}

export function* add({ payload }) {
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

export function* remove({ payload }) {
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
