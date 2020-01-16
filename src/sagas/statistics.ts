import { IAction } from '../utils/redux-create-reducer';
import { put, takeEvery } from 'redux-saga/effects';
import moment from 'moment';
import { BALANCE_SET_DATE } from '../actions/statistics';
import ridesActions from '../actions/rides';
import expensesActions from '../actions/expenses';

import { IRecord } from '../constants';
import { read as expRead } from './expenses';
import { read as ridesRead } from './rides';

const query = (date: number) => (row: IRecord) => moment(row.timestamp).isSame(date, 'month');

function* getStatByDate({ payload: date }: IAction) {
  try {
    const rides = yield ridesRead({ query: date && query(date) });
    const expenses = yield expRead({ query: date && query(date) });
    yield put(ridesActions.initSuccess(rides));
    yield put(expensesActions.initSuccess(expenses));
  } catch (err) {
    console.log(err);
  }
}

export default function* counterSaga() {
  yield takeEvery(BALANCE_SET_DATE, getStatByDate);
}
