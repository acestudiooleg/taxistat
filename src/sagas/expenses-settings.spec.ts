import { call, put, take } from 'redux-saga/effects';
import expensesSettings, { fetch } from './expenses-settings';
import { saga, does, ends, throws } from '../utils/saga';

import { FETCH_EXPENSES_SETTINGS, fetchSuccess, fetchFailure } from '../actions/expensesSettings';

const response = 'hello world';

test('fetch function', () => {
  expect(fetch()).toBe(response);
});

describe(
  'Saga: ExpensesSettings - positive test case',
  saga(expensesSettings, [
    does('should wait for fetch action', take(FETCH_EXPENSES_SETTINGS)),
    does('should fetch data', call(fetch)),
    does('should dispatch data', put(fetchSuccess(response)), response),
    ends()
  ])
);

describe(
  'Saga: ExpensesSettings - negative test case',
  saga(expensesSettings, [
    does('should wait for fetch action', take(FETCH_EXPENSES_SETTINGS)),
    does('should fetch data', call(fetch)),
    throws(does('should dispatch error', put(fetchFailure('some error')), 'some error')),
    ends(),
  ]),
);
