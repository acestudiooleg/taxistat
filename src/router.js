import { push } from 'connected-react-router';

const router = {
  root: '/',
  settings: '/settings',
  balance: '/balance',
  statistics: '/statistics',
  earn: '/earn',
  spend: '/spend',
};

const makeGoTo = path => dispatch => dispatch(push(path));

export const goToBalance = makeGoTo(router.balance);
export const goToSettings = makeGoTo(router.settings);
export const goToStatistics = makeGoTo(router.statistics);
export const goToEarn = makeGoTo(router.earn);
export const goToSpend = makeGoTo(router.spend);

export default router;
