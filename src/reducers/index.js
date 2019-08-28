import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import statistics from './statistics';
import settings from './settings';
import expensesSettings from './expensesSettings';
import taxiServices from './taxiServices';
import rides from './rides';
import expenses from './expenses';
import backup from './backup';
import keyboard from './keyboard';

export default history => combineReducers({
  router: connectRouter(history),
  statistics,
  settings,
  taxiServices,
  expensesSettings,
  rides,
  expenses,
  backup,
  keyboard,
});
