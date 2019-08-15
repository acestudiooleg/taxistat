import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMonitor from '@clarketm/saga-monitor';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './reducers';
import selectorLogger from './selectorsLogger';

export default function (initialState = {}, rootSaga, history) {
  let composeEnhancers;
  // TODO:: fix before release
  const isDevelopment = true;
  if (isDevelopment && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = composeWithDevTools;
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      serialize: true,
    });
  } else {
    composeEnhancers = compose;
  }

  const sagaMonitorConfig = {
    level: 'debug', // logging level
    verbose: true, // verbose mode
    effectCancel: true, // show cancelled effects
    actionDispatch: true, // show dispatched actions
  };

  const sagaLogger = (level, message, error, args) => {
    /* eslint-disable no-console */
    if (level === 'error' && error) {
      console.error(error);
      if (args) {
        console.error(args.join('\n'));
      }
    } else {
      console[level](message, error, ...args);
    }
    /* eslint-enable no-console */
  };

  let sagaMonitor;

  if (isDevelopment) {
    sagaMonitor = createSagaMonitor(sagaMonitorConfig);
  }

  const sagaMiddleware = createSagaMiddleware({
    sagaMonitor,
    logger: sagaLogger,
  });

  let selectorMonitor;

  if (isDevelopment) {
    selectorMonitor = selectorLogger();
  }

  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware, selectorMonitor)),
  );
  sagaMiddleware.run(rootSaga);

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
}
