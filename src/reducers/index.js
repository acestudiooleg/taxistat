import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import settings from './settings';
import expensesSettings from './expensesSettings';
import taxiServices from './taxiServices';
import rides from './rides';
import expenses from './expenses';
import backup from './backup';

export default history => combineReducers({
  router: connectRouter(history),
  counter,
  settings,
  taxiServices,
  expensesSettings,
  rides,
  expenses,
  backup,
});
