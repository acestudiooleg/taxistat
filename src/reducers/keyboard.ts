import createReducer from '../utils/redux-create-reducer';
import { SHOW, HIDE } from '../actions/keyboard';

export interface IKeyboard {
  hidden: boolean;
}

interface IState {
  keyboard: IKeyboard;
}

export const initialState: IKeyboard = {
  hidden: true,
};

export const getKeyboard = (state: IState): IKeyboard => state.keyboard;

export default createReducer(initialState, {
  [SHOW]: () => ({ hidden: false }),
  [HIDE]: () => ({ hidden: true }),
});
