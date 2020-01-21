// https://storybook.js.org/docs/basics/writing-stories/

import React from 'react';
// import { action } from '@storybook/addon-actions';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
// import { text, boolean, number, select, radios } from '@storybook/addon-knobs';

import BalanceTotal from './index';

export default {
  title: 'components/BalanceTotal',
};

const props = {
  earn: 120,
  balance: 110,
  expenses: 101,
  earnToday: 50,
  currency: 'USD',
  distancePrice: 3,
  distance: 10,
  distanceName: 'KM',
  dateTitle: '123456',
  orders: 3,
  taxiDriver: false,
};

export const Idle = () => {
  return <BalanceTotal {...props} />;
};
