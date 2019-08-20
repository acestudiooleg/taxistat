import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

import Layout from '../components/Layout';
import BalanceTotal from '../components/BalanceTotal';
import { Container, D11 } from '../MyHTML';

import router from '../router';

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

  const goto = url => () => dispatch(push(url));

  return (
    <Layout title={t('balance')}>
      <BalanceTotal earn={16632.0} balance={-5528.0} expenses={7191.0} earnToday={168.01} />
      <div className={classes.buttons}>
        <Container spacing={1} justify="center">
          <D11>
            <Button fullWidth onClick={goto(router.earn)} variant="contained" color="primary">
              {t('earned')}
            </Button>
          </D11>
          <D11>
            <SpendButton fullWidth onClick={goto(router.spend)} variant="contained">
              {t('spent')}
            </SpendButton>
          </D11>
        </Container>
      </div>
    </Layout>
  );
};

export default Balance;
