import { createEmptyAction } from '../utils/actions';

export const SHOW = 'keyboard/SHOW';
export const HIDE = 'keyboard/HIDE';

export const types = {
  SHOW,
  HIDE,
};

export const show = createEmptyAction(SHOW);
export const hide = createEmptyAction(HIDE);

export default {
  show,
  hide,
};
