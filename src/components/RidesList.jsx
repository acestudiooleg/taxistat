import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import CashIcon from '@material-ui/icons/Money';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import ProfitIcon from '@material-ui/icons/ShowChart';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DistanceIcon from '@material-ui/icons/Navigation';
import Divider from '@material-ui/core/Divider';

import Text from './Text';
import { makeDayLine } from './DateLine';

import { PayTypes } from '../constants';

const useStyles = makeStyles(() => ({
  list: {
    width: '100%',
  },
  li: {
    padding: 4,
    width: '100%',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  listIcon: {
    minWidth: 30,
  },

  param: {
    display: 'flex',
    width: 120,
    padding: 10,
  },
}));

const RidesList = ({ rides, currency }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const icons = {
    [PayTypes.Cash]: <CashIcon color="primary" />,
    [PayTypes.Card]: <CreditCardIcon color="secondary" />,
    [PayTypes.CardAndCash]: <CreditCardIcon color="primary" />,
  };

  return (
    <List className={classes.list} component="nav" aria-label="main mailbox folders">
      {rides.map(({
        timestamp, serviceName, payType, distance, money, profit,
      }) => {
        const icon = icons[payType];

        return (
          <div key={timestamp + money}>
            {makeDayLine(timestamp)}
            <ListItem className={classes.li}>
              <div className={classes.param}>
                <ListItemIcon className={classes.listIcon}>{icon}</ListItemIcon>
                <Text label={serviceName} />
              </div>
              <div className={classes.param}>
                <ListItemIcon className={classes.listIcon}>
                  <DistanceIcon color="secondary" />
                </ListItemIcon>
                <Text label={distance} measure={t('km')} />
              </div>
              <div className={classes.param}>
                <ListItemIcon className={classes.listIcon}>
                  <MoneyIcon color="secondary" />
                </ListItemIcon>
                <Text label={money} measure={currency} />
              </div>
              <div className={classes.param}>
                <ListItemIcon className={classes.listIcon}>
                  <ProfitIcon color="secondary" />
                </ListItemIcon>
                <Text label={profit} measure={currency} />
              </div>
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </List>
  );
};

RidesList.propTypes = {
  rides: PropTypes.arrayOf(
    PropTypes.shape({
      serviceName: PropTypes.string.isRequired,
      distance: PropTypes.string.isRequired,
      money: PropTypes.string.isRequired,
      profit: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currency: PropTypes.string.isRequired,
};

export default RidesList;
