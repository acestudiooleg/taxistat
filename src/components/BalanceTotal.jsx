import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import Table from './Table';

const BalanceTotal = ({
  earn, balance, expenses, earnToday,
}) => {
  const { t } = useTranslation();

  const rows = [
    { title: t('earn'), icon: <AttachMoneyIcon color="primary" />, value: earn },
    { title: t('balance'), icon: <AccountBalanceWalletIcon color="primary" />, value: balance },
    { title: t('expenses'), icon: <DirectionsCarIcon color="primary" />, value: expenses },
    { title: t('earn-today'), icon: <CalendarTodayIcon color="primary" />, value: earnToday },
  ];

  return <Table rows={rows} />;
};

BalanceTotal.propTypes = {
  earn: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
  earnToday: PropTypes.number.isRequired,
};

export default BalanceTotal;
