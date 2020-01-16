import { call, put, take } from 'redux-saga/effects';
import backup, { fetch } from './backup';
import { saga, does, ends, throws } from '../utils/saga';

import { FETCH_BACKUP, fetchSuccess, fetchFailure } from '../actions/backup';

const response = 'hello world';

test('fetch function', () => {
  expect(fetch()).toBe(response);
});

describe(
  'Saga: Backup - positive test case',
  saga(backup, [
    does('should wait for fetch action', take(FETCH_BACKUP)),
    does('should fetch data', call(fetch)),
    does('should dispatch data', put(fetchSuccess(response)), response),
    ends()
  ])
);

describe(
  'Saga: Backup - negative test case',
  saga(backup, [
    does('should wait for fetch action', take(FETCH_BACKUP)),
    does('should fetch data', call(fetch)),
    throws(does('should dispatch error', put(fetchFailure('some error')), 'some error')),
    ends(),
  ]),
);
