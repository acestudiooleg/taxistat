// @ts-nocheck
// https://storybook.js.org/docs/basics/writing-stories/

import React from 'react';
// import { action } from '@storybook/addon-actions';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
import { text } from '@storybook/addon-knobs';

import Input from './index';

export default {
  title: 'containers/Input',
};

export const Idle = () => {
  return (
    <Input
      placeholder={text('placeholder', 'idle')}
      value={text('value', 'hello world')}
      start={text('start', 'start')}
      end={text('end', 'end')}
    />
  );
};
