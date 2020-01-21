// https://storybook.js.org/docs/basics/writing-stories/

import React from 'react';
// import { action } from '@storybook/addon-actions';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
// import { text, boolean, number, select, radios } from '@storybook/addon-knobs';

import ChooseExpenseType from './index';
import { predefinedExpenses } from '../../constants';
import { withState } from '../../../.storybook/decorators';

export default {
  title: 'components/ChooseExpenseType',
};

const expenses = predefinedExpenses.map((el, i) => ({ ...el, value: i + 1 }));

export const Idle = withState(expenses[0])((state, onChange) => {
  return (
    <div>
      <ChooseExpenseType expenseId={state.value} expenses={expenses} onChange={onChange} />
      {state.value} ID
    </div>
  );
});
