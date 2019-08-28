import { createDataAction } from '../helpers';

export const BALANCE_SET_DATE = 'statistics/BALANCE_SET_DATE';

export const types = {
  BALANCE_SET_DATE,
};

export default {
  balanceSetDate: createDataAction(BALANCE_SET_DATE),
};
