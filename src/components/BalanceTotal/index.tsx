import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';

import Table, { IRow } from '../Table';
import { calcPercent } from '../../utils/calculator';

interface IProps {
  earn: number;
  balance: number;
  expenses: number;
  earnToday: number;
  currency: string;
  distancePrice: number;
  distance: number;
  distanceName: string;
  dateTitle: string;
  orders: number;
  taxiDriver: boolean;
}

const BalanceTotal = ({
  earn,
  balance,
  expenses,
  earnToday,
  currency,
  distancePrice,
  distance,
  distanceName,
  dateTitle,
  orders,
  taxiDriver,
}: IProps) => {
  const { t } = useTranslation();

  const percent = Number((calcPercent(earn, balance) * -1).toFixed(2));

  const rows: IRow[] = [
    {
      title: t('earn'),
      icon: <Icon name="attach_money" color="primary" />,
      value: earn.toFixed(2),
      taxiDriver,
      percent,
      ms: currency,
    },
    {
      title: t('balance'),
      icon: <Icon name="account_balance_wallet" color="primary" />,
      value: balance.toFixed(2),
      taxiDriver,
      percent: (100 - Number(percent)) * -1,
      ms: currency,
    },
    {
      title: t('expenses'),
      icon: <Icon name="directions_car" color="primary" />,
      value: expenses.toFixed(2),
      ms: currency,
    },
    {
      title: dateTitle,
      icon: <Icon name="calendar_today" color="primary" />,
      value: earnToday.toFixed(2),
      ms: currency,
    },
    {
      title: t('distance-price', { distanceName }),
      icon: <Icon name="local_gas_station" color="primary" />,
      value: distancePrice.toFixed(2),
      ms: currency,
    },
    {
      title: t('orders-qty'),
      icon: <Icon name="poll" color="primary" />,
      value: orders,
      ms: '',
    },
    {
      title: t('distance'),
      icon: <Icon name="navigation" color="primary" />,
      value: distance.toFixed(2),
      ms: distanceName,
    },
  ];

  return <Table rows={rows} />;
};

export default BalanceTotal;
