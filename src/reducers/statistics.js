import { createReducer } from '../helpers';
import { BALANCE_SET_DATE } from '../actions/statistics';

const initialState = {
  currentDate: new Date(),
};

export const getStatisticts = ({ statistics }) => statistics;

export default createReducer(initialState, {
  [BALANCE_SET_DATE]: action => ({ currentDate: action.payload }),
});
