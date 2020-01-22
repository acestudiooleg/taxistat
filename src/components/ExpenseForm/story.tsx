// @ts-nocheck
// https://storybook.js.org/docs/basics/writing-stories/

import React from 'react';
import { action } from '@storybook/addon-actions';
import { IExpenseSetting } from '../../constants';
import { withState } from '../../../.storybook/decorators';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
// import { text, boolean, number, select, radios } from '@storybook/addon-knobs';

import ExpenseForm from './index';

export default {
  title: 'components/ExpenseForm',
};

const expense: IExpenseSetting = {
  commentsEnabled: false,
  isFuel: false,
  name: 'Hello Expense',
};

export const NewExpense = withState({ ...expense, isNew: true })((state, set) => {
  return <ExpenseForm expense={state} onChange={set} onRemove={action('Remove')} onSave={action('onSave')} />;
});

export const ExistExpense = withState(expense)((state, set) => {
  return <ExpenseForm expense={state} onChange={set} onRemove={action('Remove')} onSave={action('onSave')} />;
});
