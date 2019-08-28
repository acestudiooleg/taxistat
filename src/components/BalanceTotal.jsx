import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DistanceIcon from '@material-ui/icons/Navigation';
import FuelConsumptionIcon from '@material-ui/icons/LocalGasStation';

import Table from './Table';
import { calcPercent } from '../utils';

const BalanceTotal = ({
  earn, balance, expenses, earnToday, currency, distancePrice, distance, distanceName,
}) => {
  const { t } = useTranslation();

  const percent = calcPercent(earn, balance).toFixed(2) * -1;

  const rows = [
    {
      title: t('earn'),
      icon: <AttachMoneyIcon color="primary" />,
      value: earn.toFixed(2),
      percent,
      ms: currency,
    },
    {
      title: t('balance'),
      icon: <AccountBalanceWalletIcon color="primary" />,
      value: balance.toFixed(2),
      percent: (100 - percent) * -1,
      ms: currency,
    },
    {
      title: t('expenses'),
      icon: <DirectionsCarIcon color="primary" />,
      value: expenses.toFixed(2),
      ms: currency,
    },
    {
      title: t('earn-today'),
      icon: <CalendarTodayIcon color="primary" />,
      value: earnToday.toFixed(2),
      ms: currency,
    },
    {
      title: t('distance-price', { distanceName }),
      icon: <FuelConsumptionIcon color="primary" />,
      value: distancePrice.toFixed(2),
      ms: currency,
    },
    {
      title: t('distance'),
      icon: <DistanceIcon color="primary" />,
      value: distance.toFixed(2),
      ms: distanceName,
    },
  ];

  return <Table rows={rows} />;
};

BalanceTotal.propTypes = {
  distancePrice: PropTypes.number.isRequired,
  distance: PropTypes.number.isRequired,
  earn: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
  earnToday: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  distanceName: PropTypes.string.isRequired,
};

export default BalanceTotal;
