import createReducer from '../utils/redux-create-reducer';
import { IService } from '../constants';
import { SAVE, SAVE_SUCCESS, INIT_SUCCESS, ADD_SUCCESS, SAVE_FAILURE } from '../actions/taxi-services';

export interface ITaxiServices {
  hasData?: boolean;
  loading?: boolean;
  list: IService[];
  error?: Error;
}

interface IState {
  taxiServices: ITaxiServices;
}

export const initialState: ITaxiServices = {
  hasData: false,
  loading: false,
  list: [],
};

export const getTaxiServices = (state: IState): ITaxiServices => state.taxiServices;

const save = (list: IService[]) => ({ list, loading: false, hasData: true });

export default createReducer(initialState, {
  [SAVE]: () => ({ loading: true }),
  [ADD_SUCCESS]: save,
  [SAVE_SUCCESS]: save,
  [INIT_SUCCESS]: save,
  [SAVE_FAILURE]: (error: Error) => ({ error, loading: false, hasData: true }),
});
