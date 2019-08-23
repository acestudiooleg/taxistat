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

import { PayTypes } from '../constants';

const useStyles = makeStyles(() => ({
  listIcon: {
    minWidth: 30,
  },
}));

const RidesList = ({ rides }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const icons = {
    [PayTypes.Cash]: <CashIcon color="primary" />,
    [PayTypes.Card]: <CreditCardIcon color="secondary" />,
    [PayTypes.CardAndCash]: <CreditCardIcon color="primary" />,
  };

  return (
    <List component="nav" aria-label="main mailbox folders">
      {rides.map(({
        serviceName, payType, distance, money, profit,
      }) => {
        const icon = icons[payType];
        return (
          <div>
            <ListItem key={serviceName}>
              <ListItemIcon className={classes.listIcon}>{icon}</ListItemIcon>
              <Text label={serviceName} />
              <ListItemIcon className={classes.listIcon}>
                <DistanceIcon color="secondary" />
              </ListItemIcon>
              <Text label={distance} measure={t('km')} />
              <ListItemIcon className={classes.listIcon}>
                <MoneyIcon color="secondary" />
              </ListItemIcon>
              <Text label={money} measure={t('uah')} />
              <ListItemIcon className={classes.listIcon}>
                <ProfitIcon color="secondary" />
              </ListItemIcon>
              <Text label={profit} measure={t('uah')} />
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
};

export default RidesList;
