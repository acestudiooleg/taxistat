import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../src/router';
import '../src/i18n';
import { withState as ws } from '@dump247/storybook-state';
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

export const Router = (fn: () => any) => <BrowserRouter basename={process.env.REACT_APP_BASENAME || Routes.Root}>{fn()}</BrowserRouter>;

export const withState = defaultState => fn => {
    
    const state = !isArray(defaultState) && !isObject(defaultState) ? { value : defaultState }: defaultState;
    return ws(state)(({ store }) => fn(store.state, val => store.set(val), () => store.reset()));
};
