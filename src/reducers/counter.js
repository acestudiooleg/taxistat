import { createReducer } from "../helpers";
import {
  INCREMENT,
  DECREMENT,
  ASYNC_INC,
  ASYNC_DEC,
  ASYNC_INC_SUCCESS,
  ASYNC_DEC_SUCCESS
} from "../actions/counter";

const initialState = {
  value: 0,
  loading: false
};

export const getCounter = ({ counter }) => counter;

const loading = () => ({ loading: true });
const success = ({ payload: value }) => ({ value, loading: false });

export default createReducer(initialState, {
  [INCREMENT]: (action, { value }) => ({ value: value + 1 }),
  [DECREMENT]: (action, { value }) => ({ value: value - 1 }),
  [ASYNC_INC]: loading,
  [ASYNC_DEC]: loading,
  [ASYNC_INC_SUCCESS]: success,
  [ASYNC_DEC_SUCCESS]: success
});
