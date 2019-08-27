import React, { useState } from 'react';
import Swipe from 'react-easy-swipe';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import Layout from '../components/Layout';
import RidesList from '../components/RidesList';
import ExpensesList from '../components/ExpensesList';

import { getRides } from '../reducers/rides';
import { getExpenses } from '../reducers/expenses';

import { goToBalance } from '../router';
import { sortByDate } from '../utils';

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
  const { list: rides } = useSelector(getRides, shallowEqual);
  const { list: expenses } = useSelector(getExpenses, shallowEqual);
  const [tab, setTab] = useState(0);

  const handleChange = (event, tabValue) => setTab(tabValue);

  return (
    <Swipe tolerance={100} onSwipeLeft={() => goToBalance(dispatch)}>
      <Layout title={t('balance')}>
        <AppBar position="static" color="secondary">
          <Tabs value={tab} onChange={handleChange} indicatorColor="primary" variant="fullWidth">
            <Tab label={t('orders')} />
            <Tab label={t('expenses')} />
          </Tabs>
        </AppBar>
        <Paper className={classes.list}>
          {tab === 0 && <RidesList rides={sortByDate(rides, true)} />}
          {tab === 1 && <ExpensesList expenses={sortByDate(expenses, true)} />}
        </Paper>
      </Layout>
    </Swipe>
  );
};

export default Statictics;
