import { push } from 'connected-react-router';
import { Dispatch } from 'redux';

export enum Router {
  Root = '/',
  Settings = '/settings',
  Balance = '/balance',
  Statistics = '/statistics',
  Earn = '/earn',
  Spend = '/spend',
  EditRide = '/edit-ride',
}

export const makeGoTo = (path: string) => (dispatch: Dispatch) => dispatch(push(path));

export const goToBalance = makeGoTo(Router.Balance);
export const goToSettings = makeGoTo(Router.Settings);
export const goToStatistics = makeGoTo(Router.Statistics);
export const goToEarn = makeGoTo(Router.Earn);
export const goToSpend = makeGoTo(Router.Spend);

export default Router;
