import React from 'react';
import Swipe from 'react-easy-swipe';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Layout from '../components/Layout';
import RidesList from '../components/RidesList';
import ExpensesList from '../components/ExpensesList';

import { getRides } from '../reducers/rides';
import { getExpenses } from '../reducers/expenses';

import { goToBalance } from '../router';

const Statictics = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { list: rides } = useSelector(getRides, shallowEqual);
  const { list: expenses } = useSelector(getExpenses, shallowEqual);

  return (
    <Swipe tolerance={100} onSwipeLeft={() => goToBalance(dispatch)}>
      <Layout title={t('balance')}>
        <RidesList rides={rides} />
        <ExpensesList expenses={expenses} />
      </Layout>
    </Swipe>
  );
};

export default Statictics;
