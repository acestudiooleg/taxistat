import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { createHashHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router';

import routes from './router';
import Home from './routes/Home';
import Settings from './routes/Settings';
import Init from './routes/Init';

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

  if (!init) {
    setInit(true);
    dispatch(actions.init());
  }

  const redirectToRoot = () => <Redirect to={!done ? routes.init : routes.home} />;
  return (
    <ConnectedRouter history={history}>
      <Helmet>
        <title>{t('app-title')}</title>
      </Helmet>
      <Switch>
        <Route exact path={routes.root} render={redirectToRoot} />
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.settings} component={Settings} />
        <Route exact path={routes.init} component={Init} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
