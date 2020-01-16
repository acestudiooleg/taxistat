import moment from 'moment';
import { createSelector } from 'reselect';
import { getRides } from '../reducers/rides';
import { getExpenses } from '../reducers/expenses';
import { getStatistics } from '../reducers/statistics';

export const getBalance = createSelector(
  getRides,
  getExpenses,
  getStatistics,
  ({ list: rides }, { list: expensesList }, { currentDate }) => {
    const earn = (rides || []).reduce((acc, el) => acc + Number(el.profit), 0);
    const distance = (rides || []).reduce((acc, el) => acc + Number(el.distance), 0);
    const expenses = (expensesList || []).reduce((acc, el) => acc + Number(el.value), 0);
    const balance = earn - expenses;
    const earnToday = (rides || [])
      .filter(el => moment(el.timestamp).isSame(moment(currentDate), 'day'))
      .reduce((acc, el) => acc + Number(el.profit), 0);
    return {
      earn,
      expenses,
      balance,
      earnToday,
      distance,
      orders: rides.length,
    };
  },
);

export default {
  getBalance,
};
