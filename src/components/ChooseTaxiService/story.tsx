// @ts-nocheck
// https://storybook.js.org/docs/basics/writing-stories/

import React from 'react';
// import { action } from '@storybook/addon-actions';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
// import { text, boolean, number, select, radios } from '@storybook/addon-knobs';

import ChooseTaxiService from './index';
import { predefinedServices } from '../../constants';
import { withState } from '../../../.storybook/decorators';

export default {
  title: 'components/ChooseTaxiService',
};

const services = predefinedServices.map((el, i) => ({ ...el, value: i + 1 }));

export const Idle = withState(services[0])((state, onChange) => {
  return <ChooseTaxiService serviceId={state.value} services={services} onChange={onChange} />;
});
