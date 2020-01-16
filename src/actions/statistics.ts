import { createAction } from '../utils/actions';

export interface IStatisticsData {
  currentDate: Date;
}

export const BALANCE_SET_DATE = 'statistics/BALANCE_SET_DATE';

export const types = {
  BALANCE_SET_DATE,
};

export const balanceSetDate = createAction(BALANCE_SET_DATE);

export default {
  balanceSetDate,
};
