import { createReducer as reduxCreateReducer } from 'redux-create-reducer';

export const createEmptyAction = type => () => ({ type });

export const createDataAction = type => payload => ({ type, payload });

export const createReducer = (initState, methods = {}) => {
  const revertedMetods = Object.keys(methods).reduce((accum, methodName) => {
    const data = { ...accum };
    data[methodName] = (state, action) => ({
      ...state,
      ...methods[methodName](action, state),
    });
    return data;
  }, {});
  return reduxCreateReducer(initState, revertedMetods);
};
