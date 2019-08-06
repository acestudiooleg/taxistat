import { put, takeEvery } from "redux-saga/effects";
import actions, { ASYNC_DEC, ASYNC_INC } from "../actions/counter";

const timer = time =>
  new Promise(s => {
    setTimeout(s, time);
  });

function* makeAsyncIncrement({ payload: counter }) {
  try {
    yield timer(1000);
    yield put(actions.asyncIncSuccess(counter + 1));
  } catch (err) {
    yield put(actions.asyncIncSuccess(0));
  }
}

function* makeAsyncDecrement({ payload: counter }) {
  try {
    yield timer(1000);
    yield put(actions.asyncDecSuccess(counter - 1));
  } catch (err) {
    yield put(actions.asyncDecSuccess(0));
  }
}

export default function* counterSaga() {
  yield takeEvery(ASYNC_INC, makeAsyncIncrement);
  yield takeEvery(ASYNC_DEC, makeAsyncDecrement);
}
