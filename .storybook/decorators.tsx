import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../src/router';
import '../src/i18n';

export const Router = (fn: () => any) => <BrowserRouter basename={process.env.REACT_APP_BASENAME || Routes.Root}>{fn()}</BrowserRouter>;