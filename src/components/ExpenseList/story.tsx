// @ts-nocheck
// https://storybook.js.org/docs/basics/writing-stories/

import React from 'react';
// import { action } from '@storybook/addon-actions';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
// import { text, boolean, number, select, radios } from '@storybook/addon-knobs';

import ExpenseList from './index';
import { IExpense } from '../../constants';

export default {
  title: 'components/ExpenseList',
};

const expenses: IExpense[] = [
  {
    timestamp: '2020-01-02 22:15',
    comment: 'hello',
    value: 12,
    expenseName: 'color',
  },
  {
    timestamp: '2020-01-02 22:15',
    comment: 'hello',
    value: 12,
    expenseName: 'color',
  },
  {
    timestamp: '2020-01-02 22:15',
    comment: 'hello',
    value: 12,
    expenseName: 'color',
  },
];

export const Idle = () => {
  return <ExpenseList expenses={expenses} currency="USD" />;
};
