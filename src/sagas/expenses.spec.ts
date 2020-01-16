import { call, put, take } from 'redux-saga/effects';
import expenses, { fetch } from './expenses';
import { saga, does, ends, throws } from '../utils/saga';

import { FETCH_EXPENSES, fetchSuccess, fetchFailure } from '../actions/expenses';

const response = 'hello world';

test('fetch function', () => {
  expect(fetch()).toBe(response);
});

describe(
  'Saga: Expenses - positive test case',
  saga(expenses, [
    does('should wait for fetch action', take(FETCH_EXPENSES)),
    does('should fetch data', call(fetch)),
    does('should dispatch data', put(fetchSuccess(response)), response),
    ends()
  ])
);

describe(
  'Saga: Expenses - negative test case',
  saga(expenses, [
    does('should wait for fetch action', take(FETCH_EXPENSES)),
    does('should fetch data', call(fetch)),
    throws(does('should dispatch error', put(fetchFailure('some error')), 'some error')),
    ends(),
  ]),
);
