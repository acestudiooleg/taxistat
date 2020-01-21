// https://storybook.js.org/docs/basics/writing-stories/

import React from 'react';
// import { action } from '@storybook/addon-actions';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
// import { text, boolean, number, select, radios } from '@storybook/addon-knobs';

import Charts from './index';

export default {
  title: 'components/Charts',
};

const rides = [];
const expenses = [];
const currency = 'USD';

export const Idle = () => {
  return <Charts rides={rides} expenses={expenses} currency={currency} />;
};
