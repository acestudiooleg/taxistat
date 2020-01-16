import { call, put, take } from 'redux-saga/effects';
import settings, { fetch } from './settings';
import { saga, does, ends, throws } from '../utils/saga';

import { FETCH_SETTINGS, fetchSuccess, fetchFailure } from '../actions/settings';

const response = 'hello world';

test('fetch function', () => {
  expect(fetch()).toBe(response);
});

describe(
  'Saga: Settings - positive test case',
  saga(settings, [
    does('should wait for fetch action', take(FETCH_SETTINGS)),
    does('should fetch data', call(fetch)),
    does('should dispatch data', put(fetchSuccess(response)), response),
    ends()
  ])
);

describe(
  'Saga: Settings - negative test case',
  saga(settings, [
    does('should wait for fetch action', take(FETCH_SETTINGS)),
    does('should fetch data', call(fetch)),
    throws(does('should dispatch error', put(fetchFailure('some error')), 'some error')),
    ends(),
  ]),
);
