import React, { useState } from 'react';
import moment from 'moment';
import Swipe from 'react-easy-swipe';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import Input from '../containers/Input';
import Layout from '../components/Layout';
import RidesList from '../components/RidesList';
import ExpensesList from '../components/ExpensesList';
import Charts from '../components/Charts';

import { getRides } from '../reducers/rides';
import { getExpenses } from '../reducers/expenses';
import { getSettings } from '../reducers/settings';

import { goToBalance } from '../router';
import { sortByDate } from '../utils';

const filterRides = (rides, pattern) => rides.filter(({
  timestamp, serviceName, money, profit, distance,
}) => [moment(timestamp).format('DD MM YYYY HH mm'), serviceName, money, profit, distance].some(v => pattern.test(v)));

const filterExpenses = (expenses, pattern) => expenses.filter(({
  timestamp, expenseName, value, comment,
}) => [moment(timestamp).format('DD MM YYYY HH mm'), expenseName, value, comment].some(v => pattern.test(v)));

const useStyles = makeStyles(() => ({
  list: {
    padding: 5,
    overflow: 'auto',
    height: 'calc(100vh - 140px)',
  },
}));

const Statictics = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { currency } = useSelector(getSettings, shallowEqual);
  const { list: ridesList } = useSelector(getRides, shallowEqual);
  const { list: expensesList } = useSelector(getExpenses, shallowEqual);
  const [tab, setTab] = useState(0);
  const [filterValue, setFilter] = useState('');

  const onChangeFilter = ({ target: { value } }) => setFilter(value);
  const handleChange = (event, tabValue) => setTab(tabValue);

  const pattern = new RegExp(filterValue, 'ig');

  const rides = tab === 0 ? sortByDate(filterRides(ridesList, pattern)) : ridesList;
  const expenses = tab === 1 ? sortByDate(filterExpenses(expensesList, pattern), true) : expensesList;

  return (
    <Swipe tolerance={100} onSwipeLeft={() => goToBalance(dispatch)}>
      <Layout title={t('balance')}>
        <AppBar position="static" color="secondary">
          <Tabs value={tab} onChange={handleChange} indicatorColor="primary" variant="fullWidth">
            <Tab label={t('orders')} />
            <Tab label={t('expenses')} />
            <Tab label={t('charts')} />
          </Tabs>
        </AppBar>
        <Paper className={classes.list}>
          {tab !== 2 && <Input value={filterValue} onChange={onChangeFilter} placeholder={t('filter')} />}
          {tab === 0 && <RidesList rides={sortByDate(rides, true)} currency={currency} />}
          {tab === 1 && <ExpensesList expenses={sortByDate(expenses, true)} currency={currency} />}
          {tab === 2 && <Charts expenses={expensesList} rides={ridesList} currency={currency} />}
        </Paper>
      </Layout>
    </Swipe>
  );
};

export default Statictics;
