import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

// inject import
import keyboard from './keyboard';
import taxiServices from './taxi-services';
import statistics from './statistics';
import settings from './settings';
import rides from './rides';
import expensesSettings from './expenses-settings';
import expenses from './expenses';
import backup from './backup';

export default (history: History): Reducer =>
  combineReducers({
    router: connectRouter(history),
    // inject usage
    keyboard,
    taxiServices,
    statistics,
    settings,
    rides,
    expensesSettings,
    expenses,
    backup,
  });
