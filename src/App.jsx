import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { createHashHistory } from 'history';
import { connect } from 'react-redux';
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

const mapStateToProps = state => ({
  settings: getSettings(state),
});

const mapDispatchToProps = {
  init: actions.init,
};

function App({ settings, init }) {
  const history = createHashHistory({});
  const { t } = useTranslation();

  if (!settings.initialized) {
    init();
  }

  const redirectToRoot = () => <Redirect to={!settings.done ? routes.init : routes.home} />;
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

App.propTypes = {
  settings: PropTypes.shape({
    initialized: PropTypes.bool.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
  init: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
