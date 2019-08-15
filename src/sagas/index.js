import { all } from 'redux-saga/effects';
import counter from './counter';
import init from './init';
import settings from './settings';
import taxiServices from './taxiServices';
import expensesSettings from './expensesSettings';

export default function createRootSaga() {
  const sagas = [counter(), init(), settings(), taxiServices(), expensesSettings()];

  return function* rootSaga() {
    yield all(sagas);
  };
}
