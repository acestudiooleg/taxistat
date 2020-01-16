import { actionSeq, act, hasFunc, hasType } from '../utils/actions';
import taxiServices, {
  FETCH_TAXI_SERVICES,
  FETCH_TAXI_SERVICES_SUCCESS,
  FETCH_TAXI_SERVICES_FAILURE,
  fetch,
  fetchSuccess,
  fetchFailure,
  types,
} from './taxi-services';

describe(
  'Actions TaxiServices - test case',
  actionSeq(taxiServices, types, [
    act(FETCH_TAXI_SERVICES, fetch),
    act(FETCH_TAXI_SERVICES_SUCCESS, fetchSuccess, true),
    act(FETCH_TAXI_SERVICES_FAILURE, fetchFailure, true),
    hasType(FETCH_TAXI_SERVICES, FETCH_TAXI_SERVICES_SUCCESS, FETCH_TAXI_SERVICES_FAILURE),
    hasFunc(fetch, fetchSuccess, fetchFailure),
  ]),
);
