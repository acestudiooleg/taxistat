import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../src/router';
import '../src/i18n';
import { Provider } from 'react-redux';
import { withState as ws } from '@dump247/storybook-state';
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

import store from '../src/store';

export const Router = (fn: () => any) => <BrowserRouter basename={process.env.REACT_APP_BASENAME || Routes.Root}>{fn()}</BrowserRouter>;

export const ReduxState = (fn: () => any) => <Provider store={store}>{fn()}</Provider>

export const withState = defaultState => fn => {
  const state = !isArray(defaultState) && !isObject(defaultState) ? { value : defaultState }: defaultState;
  return ws(state)(({ store }) => fn(store.state, val => store.set(val), () => store.reset()));
};
