// @ts-nocheck
// https://storybook.js.org/docs/basics/writing-stories/

import React from 'react';
// import { action } from '@storybook/addon-actions';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
// import { text, boolean, number, select, radios } from '@storybook/addon-knobs';

import ChoosePayType from './index';
import { PayTypes } from '../../constants';
import { withState } from '../../../.storybook/decorators';

export default {
  title: 'components/ChoosePayType',
};

export const Idle = withState(PayTypes.Cash)(({ value }, onChange) => {
  return (
    <div>
      <ChoosePayType selected={value} onChange={onChange} />
      {value}
    </div>
  );
});
