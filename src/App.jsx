import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { createHashHistory } from 'history';

import { Route, Switch, Redirect } from 'react-router';

import routes from './router';
import Balance from './routes/Balance';
import Settings from './routes/Settings';
import Statistics from './routes/Statistics';
import Earn from './routes/Earn';
import Spend from './routes/Spend';
import EditRide from './routes/EditRide';

import actions from './actions/settings';

import { getSettings } from './reducers/settings';
import './db';

import './i18n';

export const history = createHashHistory({});

const RedirectRoute = ({ component: Component, ...rest }) => {
  const { hasData, done } = useSelector(getSettings, shallowEqual);
  const comp = (props) => {
    if (hasData && !done) {
      return <Redirect to={routes.settings} />;
    }
    return <Component {...props} />;
  };

  return <Route {...rest} render={comp} />;
};

RedirectRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { initialized } = useSelector(getSettings, shallowEqual);

  if (!initialized) {
    dispatch(actions.init());
  }

  return (
    <ConnectedRouter history={history}>
      <Helmet>
        <title>{t('app-title')}</title>
      </Helmet>
      <Switch>
        <Route exact path={routes.root} render={() => <Redirect to={routes.balance} />} />
        <RedirectRoute exact path={routes.balance} component={Balance} />
        <Route exact path={routes.settings} component={Settings} />
        <RedirectRoute exact path={routes.statistics} component={Statistics} />
        <RedirectRoute exact path={routes.editRide} component={EditRide} />
        <RedirectRoute exact path={`${routes.editRide}/:id`} component={EditRide} />
        <RedirectRoute exact path={routes.earn} component={Earn} />
        <RedirectRoute exact path={routes.spend} component={Spend} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
