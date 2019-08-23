import React from 'react';
import Swipe from 'react-easy-swipe';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import Layout from '../components/Layout';
import { Container, D11 } from '../MyHTML';

import { getRides } from '../reducers/rides';
import { getExpenses } from '../reducers/expenses';

import router, { goToBalance } from '../router';

const SpendButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.main,
    },
  },
}))(Button);

const useStyles = makeStyles(theme => ({
  table: {
    // width: '100%',
    // height: 'calc(100vh - 300px)',
    // overflow: 'auto',
  },
}));

const Statictics = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { list: rides } = useSelector(getRides, shallowEqual);
  const { list: expenses } = useSelector(getExpenses, shallowEqual);

  // make as on uknon achrive cards

  return (
    <Swipe tolerance={100} onSwipeLeft={() => goToBalance(dispatch)}>
      <Layout title={t('balance')}>
        <div className={classes.table}>
          <List component="nav" aria-label="main mailbox folders">
            {rides.map(({
              serviceName, payType, distance, money, profit,
            }, i) => (
              <>
                <ListItem key={serviceName}>
                  <ListItemText primary={`${serviceName} - ${t(payType)} - ${distance} - ${money} - ${profit}`} />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </div>
      </Layout>
    </Swipe>
  );
};

export default Statictics;
