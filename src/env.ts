export const { REACT_APP_ENV, REACT_APP_BASENAME, REACT_APP_LOGIN_URL, REACT_APP_LOGOUT_URL } = process.env;
export const LOGIN_URL = REACT_APP_LOGIN_URL;
export const LOGOUT_URL = `${REACT_APP_LOGOUT_URL}?returnUrl=${REACT_APP_BASENAME}`;
