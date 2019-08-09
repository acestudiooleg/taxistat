import { all } from 'redux-saga/effects';
import settings from './settings';

export default function createRootSaga() {
  const sagas = [settings()];

  return function* rootSaga() {
    yield all(sagas);
  };
}
