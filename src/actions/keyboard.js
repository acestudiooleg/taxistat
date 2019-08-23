import { createEmptyAction } from '../helpers';

export const SHOW = 'keyboard/SHOW';
export const HIDE = 'keyboard/HIDE';

export const types = {
  SHOW,
  HIDE,
};

export default {
  show: createEmptyAction(SHOW),
  hide: createEmptyAction(HIDE),
};
