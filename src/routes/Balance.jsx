import React from 'react';
import moment from 'moment';
import Swipe from 'react-easy-swipe';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

import Layout from '../components/Layout';
import BalanceTotal from '../components/BalanceTotal';

import DateInput from '../containers/Date';

import actions from '../actions/statistics';

import { getSettings } from '../reducers/settings';
import { getStatisticts } from '../reducers/statistics';

import { getBalance } from '../selectors/balance';

import {
  goToEarn, goToSpend, goToStatistics, goToSettings,
} from '../router';

import { calcFuelCost } from '../utils';
import { Container, D11 } from '../MyHTML';

const SpendButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.main,
    },
  },
}))(Button);

const useStyles = makeStyles(() => ({
  body: {
    height: 'calc(100vh - 140px)',
  },

  datepicker: {
    marginTop: 20,
    width: '100%',
  },
  buttons: {
    width: '100%',
    position: 'absolute',
    bottom: 70,
  },
}));

const Balance = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    currency, fuelConsumption, fuelPrice, distanceName, taxiDriver,
  } = useSelector(getSettings, shallowEqual);

  const { currentDate } = useSelector(getStatisticts, shallowEqual);

  const {
    earn, balance, expenses, earnToday, distance, orders,
  } = useSelector(getBalance);

  const handleDateChange = date => dispatch(actions.balanceSetDate(date));

  const distancePrice = calcFuelCost(fuelConsumption, fuelPrice);
  const dateTitle = moment().isSame(currentDate, 'date') ? t('earn-today') : moment(currentDate).format('DD MMMM YYYY');

  const title = t('balance-for', { date: moment(currentDate).format('MMMM') });

  return (
    <Swipe onSwipeLeft={() => goToSettings(dispatch)} onSwipeRight={() => goToStatistics(dispatch)} tolerance={100}>
      <Layout title={title}>
        <div className={classes.body}>
          <BalanceTotal
            taxiDriver={taxiDriver}
            distancePrice={distancePrice}
            distance={distance}
            earn={earn}
            orders={orders}
            dateTitle={dateTitle}
            balance={balance}
            expenses={expenses}
            earnToday={earnToday}
            currency={currency}
            distanceName={t(distanceName)}
          />
          <Container spacing={4} justify="center">
            <D11>
              <DateInput
                label={t('stat-for-month')}
                className={classes.datepicker}
                value={currentDate}
                onChange={handleDateChange}
              />
            </D11>
          </Container>
          <div className={classes.buttons}>
            <Container spacing={1} justify="center">
              <D11>
                <Button fullWidth onClick={() => goToEarn(dispatch)} variant="contained" color="primary">
                  {t('earned')}
                </Button>
              </D11>
              <D11>
                <SpendButton fullWidth onClick={() => goToSpend(dispatch)} variant="contained">
                  {t('spent')}
                </SpendButton>
              </D11>
            </Container>
          </div>
        </div>
      </Layout>
    </Swipe>
  );
};

export default Balance;
