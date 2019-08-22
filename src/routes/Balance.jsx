import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

import Layout from '../components/Layout';
import BalanceTotal from '../components/BalanceTotal';
import { Container, D11 } from '../MyHTML';

import { getBalance } from '../selectors/balance';

import { goToEarn, goToSpend } from '../router';

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
    <Layout title={t('balance')}>

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
    </Layout>
  );
};

export default Balance;
