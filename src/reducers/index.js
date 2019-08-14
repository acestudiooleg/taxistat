import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import settings from './settings';
import expensesSettings from './expensesSettings';
import taxiServices from './taxiServices';

export default history => combineReducers({
  router: connectRouter(history),
  settings,
  taxiServices,
  expensesSettings,
});
