import React from 'react';
import Swipe from 'react-easy-swipe';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

import Layout from '../components/Layout';
import BalanceTotal from '../components/BalanceTotal';
import { Container, D11 } from '../MyHTML';

import { getBalance } from '../selectors/balance';

import {
  goToEarn, goToSpend, goToStatistics, goToSettings,
} from '../router';

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
    earn, balance, expenses, earnToday,
  } = useSelector(getBalance);

  return (
    <Swipe onSwipeLeft={() => goToSettings(dispatch)} onSwipeRight={() => goToStatistics(dispatch)} tolerance={100}>
      <Layout title={t('balance')}>
        <div className={classes.body}>
          <BalanceTotal earn={earn} balance={balance} expenses={expenses} earnToday={earnToday} />
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
