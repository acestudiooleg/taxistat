import { createEmptyAction, createDataAction } from '../helpers';

export const INCREMENT = 'counter/INCREMENT';
export const DECREMENT = 'counter/DECREMENT';

export const ASYNC_INC = 'counter/ASYNC_INCREMENT';
export const ASYNC_DEC = 'counter/ASYNC_DECREMENT';

export const ASYNC_INC_SUCCESS = 'counter/ASYNC_INCREMENT_SUCCESS';
export const ASYNC_DEC_SUCCESS = 'counter/ASYNC_DECREMENT_SUCCESS';

export const types = {
  INCREMENT,
  DECREMENT,
};

export default {
  increment: createEmptyAction(INCREMENT),
  decrement: createEmptyAction(DECREMENT),

  asyncInc: createDataAction(ASYNC_INC),
  asyncIncSuccess: createDataAction(ASYNC_INC_SUCCESS),

  asyncDec: createDataAction(ASYNC_DEC),
  asyncDecSuccess: createDataAction(ASYNC_DEC_SUCCESS),
};
