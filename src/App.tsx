import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import Routes from './router';
import { history } from './store';
import actions from './actions/settings';
import { getSettings } from './reducers/settings';
import './db';
import './i18n';

const Dashboard = lazy(() => import('./pages/Dashboard'));
// inject import

function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { initialized } = useSelector(getSettings, shallowEqual);

  if (!initialized) {
    dispatch(actions.init());
  }
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Helmet>
          <title>{t('app-title')}</title>
        </Helmet>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={Routes.Root} exact component={Dashboard} />
            {/* inject usage */}
          </Switch>
        </Suspense>
      </ConnectedRouter>
    </div>
  );
}

export default App;
