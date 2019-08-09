import React from 'react';
import { Helmet } from 'react-helmet';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import blue from '@material-ui/core/colors/blue';
import configureStore from './configureStore';
import createRootSaga from './sagas';

import routes from './router';
import Home from './routes/Home';
import Settings from './routes/Settings';
import Init from './routes/Init';
import words from './translations.json';

import './i18n';

function App() {
  const initialState = {};
  const history = createHashHistory({});

  const rootSaga = createRootSaga();
  const store = configureStore(initialState, rootSaga, history);
  const theme = createMuiTheme({
    palette: {
      primary: teal,
      secondary: blue,
    },
    status: {
      danger: 'orange',
    },
  });
  const isFirstVisit = true;

  const redirectToRoot = () => <Redirect to={isFirstVisit ? routes.init : routes.home} />;
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils} locale="ru">
          <ConnectedRouter history={history}>
            <Helmet>
              <title>{words['app-title']}</title>
            </Helmet>
            <Switch>
              <Route exact path={routes.root} render={redirectToRoot} />
              <Route exact path={routes.home} component={Home} />
              <Route exact path={routes.settings} component={Settings} />
              <Route exact path={routes.init} component={Init} />
            </Switch>
          </ConnectedRouter>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
