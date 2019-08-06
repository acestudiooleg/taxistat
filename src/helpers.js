import { createReducer as reduxCreateReducer } from "redux-create-reducer";

export const createEmptyAction = type => () => ({ type });

export const createDataAction = type => payload => ({ type, payload });

export const createReducer = (initState, methods = {}) => {
  const revertedMetods = Object.keys(methods).reduce((accum, methodName) => {
    accum[methodName] = (state, action) => ({
      ...state,
      ...methods[methodName](action, state)
    });
    return accum;
  }, {});
  return reduxCreateReducer(initState, revertedMetods);
};
