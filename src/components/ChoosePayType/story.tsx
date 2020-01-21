// @ts-nocheck
// https://storybook.js.org/docs/basics/writing-stories/

import React, { useState } from 'react';
// import { action } from '@storybook/addon-actions';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
// import { text, boolean, number, select, radios } from '@storybook/addon-knobs';

import ChoosePayType from './index';
import { PayTypes } from '../../constants';

export default {
  title: 'components/ChoosePayType',
};

export const Idle = () => {
  const [type, setType] = useState(PayTypes.Cash);
  const setData = ({ target: { value } }) => setType(value);
  return (
    <div>
      <ChoosePayType selected={type} onChange={setData} />
      {type}
    </div>
  );
};
