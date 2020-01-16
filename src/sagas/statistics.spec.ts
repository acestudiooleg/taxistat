import { call, put, take } from 'redux-saga/effects';
import statistics, { fetch } from './statistics';
import { saga, does, ends, throws } from '../utils/saga';

import { FETCH_STATISTICS, fetchSuccess, fetchFailure } from '../actions/statistics';

const response = 'hello world';

test('fetch function', () => {
  expect(fetch()).toBe(response);
});

describe(
  'Saga: Statistics - positive test case',
  saga(statistics, [
    does('should wait for fetch action', take(FETCH_STATISTICS)),
    does('should fetch data', call(fetch)),
    does('should dispatch data', put(fetchSuccess(response)), response),
    ends()
  ])
);

describe(
  'Saga: Statistics - negative test case',
  saga(statistics, [
    does('should wait for fetch action', take(FETCH_STATISTICS)),
    does('should fetch data', call(fetch)),
    throws(does('should dispatch error', put(fetchFailure('some error')), 'some error')),
    ends(),
  ]),
);
