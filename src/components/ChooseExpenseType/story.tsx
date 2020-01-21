// @ts-nocheck
// https://storybook.js.org/docs/basics/writing-stories/

import React, { useState } from 'react';
// import { action } from '@storybook/addon-actions';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
// import { text, boolean, number, select, radios } from '@storybook/addon-knobs';

import ChooseExpenseType from './index';
import { predefinedExpenses } from '../../constants';

export default {
  title: 'components/ChooseExpenseType',
};

const expenses = predefinedExpenses.map((el, i) => ({ ...el, ID: i + 1 }));

export const Idle = () => {
  const [state, setState] = useState({
    expenseId: expenses[0].ID,
  });
  const setData = (key, type) => ({ target: { value } }) => setState({ ...state, [key]: type(value) });
  return (
    <div>
      <ChooseExpenseType expenseId={state.expenseId} expenses={expenses} onChange={setData('expenseId', Number)} />
      {state.expenseId} ID
    </div>
  );
};
