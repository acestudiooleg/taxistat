import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import blue from '@material-ui/core/colors/blue';
import * as serviceWorker from './serviceWorker';
import App, { history } from './App';
import configureStore from './configureStore';
import createRootSaga from './sagas';

import './i18n';

function TaxiStat() {
  const initialState = {};

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

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils} locale="ru">
          <App history={history} />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  );
}

ReactDOM.render(<TaxiStat />, window.document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
