// https://storybook.js.org/docs/basics/writing-stories/

import React from 'react';
import { withState } from '../../../.storybook/decorators';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
// import { text, boolean, number, select, radios } from '@storybook/addon-knobs';

import RadioGroup, { IProps } from './index';

export default {
  title: 'components/RadioGroup',
};

interface IListItem {
  key: string;
  value: number;
}

const list: IListItem[] = [
  {
    key: 'hello 1',
    value: 1,
  },
  {
    key: 'hello 2',
    value: 2,
  },
];

export const Idle = withState(list[0])((state, onChange) => {
  const props: IProps<IListItem> = {
    list,
    selected: state.value,
    name: 'Hello world',
    onChange,
  };
  return <RadioGroup {...props} />;
});
