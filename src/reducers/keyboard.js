import { createReducer } from '../helpers';
import { SHOW, HIDE } from '../actions/keyboard';

const initialState = { hidden: true };

export default createReducer(initialState, {
  [SHOW]: () => ({ hidden: false }),
  [HIDE]: () => ({ hidden: true }),
});
