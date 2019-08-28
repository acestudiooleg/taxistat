import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import * as serviceWorker from './serviceWorker';
import App, { history } from './App';
import configureStore from './configureStore';
import createRootSaga from './sagas';

import './i18n';

export const rootSaga = createRootSaga();
export const store = configureStore({}, rootSaga, history);

function TaxiStat() {
  const theme = createMuiTheme({
    palette: {
      primary: teal,
      secondary: {
        main: '#197d73',
      },
    },
    status: {
      danger: 'orange',
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
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
serviceWorker.register();
