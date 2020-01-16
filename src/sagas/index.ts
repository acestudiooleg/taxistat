import { all } from 'redux-saga/effects';

// inject import
import init from './init';
import taxiServices from './taxi-services';
import statistics from './statistics';
import settings from './settings';
import rides from './rides';
import expensesSettings from './expenses-settings';
import expenses from './expenses';
import backup from './backup';

const allSagas = [
  // inject usage
    init,
    taxiServices,
    statistics,
    settings,
    rides,
    expensesSettings,
    expenses,
    backup,
];

export default function* appSagas() {
  yield all(allSagas.map(f => f()));
}
