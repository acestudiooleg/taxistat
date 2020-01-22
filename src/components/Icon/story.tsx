// @ts-nocheck
// https://storybook.js.org/docs/basics/writing-stories/

import React from 'react';
// import { action } from '@storybook/addon-actions';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
// import { text, boolean, number, select, radios } from '@storybook/addon-knobs';

import Icon from './index';

export default {
  title: 'components/Icon',
};

export const Idle = () => {
  return <Icon color="primary" name="save" />;
};

export const WithTestAfter = () => {
  return (
    <Icon color="primary" name="save">
      After
    </Icon>
  );
};

export const WithTestBefore = () => {
  return (
    <Icon color="primary" name="save" textColor="secondary" pos="before">
      Before
    </Icon>
  );
};
