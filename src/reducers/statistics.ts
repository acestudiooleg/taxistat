import createReducer from '../utils/redux-create-reducer';
import { BALANCE_SET_DATE, IStatisticsData } from '../actions/statistics';

interface IState {
  statistics: IStatisticsData;
}

export const initialState: IStatisticsData = {
  currentDate: new Date(),
};

export const getStatistics = (state: IState): IStatisticsData => state.statistics;

export default createReducer(initialState, {
  [BALANCE_SET_DATE]: (currentDate: Date) => ({ currentDate }),
});
