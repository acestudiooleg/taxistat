import { all } from 'redux-saga/effects';
import counter from './counter';
import init from './init';
import settings from './settings';
import taxiServices from './taxiServices';
import expensesSettings from './expensesSettings';
import expenses from './expenses';
import rides from './rides';
import backup from './backup';

export default function createRootSaga() {
  const sagas = [counter(), init(), settings(), taxiServices(), expensesSettings(), expenses(), rides(), backup()];

  return function* rootSaga() {
    yield all(sagas);
  };
}
