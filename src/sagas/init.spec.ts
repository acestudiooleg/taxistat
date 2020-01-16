import { call, put, take } from 'redux-saga/effects';
import init, { fetch } from './init';
import { saga, does, ends, throws } from '../utils/saga';

import { FETCH_INIT, fetchSuccess, fetchFailure } from '../actions/init';

const response = 'hello world';

test('fetch function', () => {
  expect(fetch()).toBe(response);
});

describe(
  'Saga: Init - positive test case',
  saga(init, [
    does('should wait for fetch action', take(FETCH_INIT)),
    does('should fetch data', call(fetch)),
    does('should dispatch data', put(fetchSuccess(response)), response),
    ends()
  ])
);

describe(
  'Saga: Init - negative test case',
  saga(init, [
    does('should wait for fetch action', take(FETCH_INIT)),
    does('should fetch data', call(fetch)),
    throws(does('should dispatch error', put(fetchFailure('some error')), 'some error')),
    ends(),
  ]),
);
