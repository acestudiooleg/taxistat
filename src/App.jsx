import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { push, ConnectedRouter } from 'connected-react-router';
import get from 'lodash/get';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { createHashHistory } from 'history';

import { Route, Switch } from 'react-router';

import routes from './router';
import Home from './routes/Home';
import Settings from './routes/Settings';
import Statictics from './routes/Statictics';

import actions from './actions/settings';

import { getSettings } from './reducers/settings';
import './db';

import './i18n';

export const history = createHashHistory({});

function App() {
  const { t } = useTranslation();
  const [init, setInit] = useState(false);
  const dispatch = useDispatch();
  const { done } = useSelector(getSettings, shallowEqual);
  const pathname = useSelector(state => get(state, 'router.location.pathname') || '', shallowEqual);

  if (!init) {
    setInit(true);
    dispatch(actions.init());
  }

  const redirectUrl = done ? routes.home : routes.settings;

  if (pathname === routes.root) {
    dispatch(push(redirectUrl));
  }

  return (
    <ConnectedRouter history={history}>
      <Helmet>
        <title>{t('app-title')}</title>
      </Helmet>
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.settings} component={Settings} />
        <Route exact path={routes.statictics} component={Statictics} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
