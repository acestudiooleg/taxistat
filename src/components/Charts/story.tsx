// https://storybook.js.org/docs/basics/writing-stories/

import React from 'react';
// import { action } from '@storybook/addon-actions';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
// import { text, boolean, number, select, radios } from '@storybook/addon-knobs';

import Charts from './index';
import { IRide, IExpense, PayTypes } from '../../constants';

export default {
  title: 'components/Charts',
};

const generateRides = () => {
  const rides = [];
  const names = [
    'Uklon',
    'Uber',
    'OnTaxi',
    'Uklon',
    'Uber',
    'OnTaxi',
    'Uklon',
    'Uber',
    'OnTaxi',
    'Uklon',
    'Uber',
    'OnTaxi',
  ];
  for (let i = 0; i < 10; i++) {
    rides.push({
      serviceName: names[i],
      serviceId: 1,
      money: 100 + i,
      distance: 9 + i,
      fuelConsumption: 10 + i,
      timestamp: 123456,
      fuelPrice: 30,
      moneyCard: 0,
      payType: PayTypes.Card,
      profit: 10 + i,
      rideTime: 0,
      tips: 0,
    });
  }
  return rides;
};

const generateExpenses = () => {
  const exp = [];
  const names = ['Fuel', 'TO', 'Parking', 'Fuel', 'TO', 'Parking', 'Fuel', 'TO', 'Parking', 'Fuel', 'TO', 'Parking'];
  for (let i = 0; i < 10; i++) {
    exp.push({
      expenseName: names[i],
      expenseId: 1,
      value: 10 + i,
    });
  }
  return exp;
};

const rides: IRide[] = generateRides();
const expenses: IExpense[] = generateExpenses();
const currency = 'USD';

export const Idle = () => {
  return <Charts rides={rides} expenses={expenses} currency={currency} />;
};
