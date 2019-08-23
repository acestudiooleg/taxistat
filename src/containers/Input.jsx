/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import actions from '../actions/keyboard';

const Input = ({ end, start, ...props }) => {
  const dispatch = useDispatch();
  const show = () => dispatch(actions.show());
  const hide = () => dispatch(actions.hide());
  return (
    <TextField
      style={{ width: '100%' }}
      margin="normal"
      variant="outlined"
      onFocus={show}
      onBlur={hide}
      InputProps={{
        endAdornment: end && <InputAdornment position="end">{end}</InputAdornment>,
        startAdornment: start && <InputAdornment position="start">{start}</InputAdornment>,
      }}
      {...props}
    />
  );
};

export default Input;
