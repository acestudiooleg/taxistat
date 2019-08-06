import React from "react";
import { createHashHistory } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, Redirect } from "react-router";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import configureStore from "./configureStore";
import createRootSaga from "./sagas";

import routes from "./router";
import Home from "./routes/Home";
import Settings from "./routes/Settings";

function App() {
  const initialState = {};
  const history = createHashHistory({});

  const rootSaga = createRootSaga();
  const store = configureStore(initialState, rootSaga, history);
  const theme = createMuiTheme({
    palette: {
      primary: purple,
      secondary: green
    },
    status: {
      danger: "orange"
    }
  });
  const isFirstVisit = false;

  const redirectToRoot = () => (
    <Redirect to={isFirstVisit ? routes.settings : routes.home} />
  );
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils} locale="ru">
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path={routes.root} render={redirectToRoot} />
              <Route exact path={routes.home} component={Home} />
              <Route exact path={routes.settings} component={Settings} />
            </Switch>
          </ConnectedRouter>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
