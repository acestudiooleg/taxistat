// @ts-nocheck
// https://storybook.js.org/docs/basics/writing-stories/

import React from 'react';
// import { action } from '@storybook/addon-actions';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
// import { text, boolean, number, select, radios } from '@storybook/addon-knobs';

import BalanceTotal from './index';

export default {
  title: 'components/BalanceTotal',
};

export const Idle = () => {
  return <BalanceTotal />;
};
