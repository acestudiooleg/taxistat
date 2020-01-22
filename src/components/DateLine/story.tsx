// https://storybook.js.org/docs/basics/writing-stories/

import React from 'react';
// import { action } from '@storybook/addon-actions';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
// import { text, boolean, number, select, radios } from '@storybook/addon-knobs';

import DateLine from './index';

export default {
  title: 'components/DateLine',
};

export const Idle = () => {
  return <DateLine date="1989-12-18 18:30" />;
};
