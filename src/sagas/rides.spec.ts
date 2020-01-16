import { call, put, take } from 'redux-saga/effects';
import rides, { fetch } from './rides';
import { saga, does, ends, throws } from '../utils/saga';

import { FETCH_RIDES, fetchSuccess, fetchFailure } from '../actions/rides';

const response = 'hello world';

test('fetch function', () => {
  expect(fetch()).toBe(response);
});

describe(
  'Saga: Rides - positive test case',
  saga(rides, [
    does('should wait for fetch action', take(FETCH_RIDES)),
    does('should fetch data', call(fetch)),
    does('should dispatch data', put(fetchSuccess(response)), response),
    ends()
  ])
);

describe(
  'Saga: Rides - negative test case',
  saga(rides, [
    does('should wait for fetch action', take(FETCH_RIDES)),
    does('should fetch data', call(fetch)),
    throws(does('should dispatch error', put(fetchFailure('some error')), 'some error')),
    ends(),
  ]),
);
