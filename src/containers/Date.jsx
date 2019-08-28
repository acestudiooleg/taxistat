/* eslint-disable react/prop-types */
import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useDispatch } from 'react-redux';

import actions from '../actions/keyboard';

const Input = ({ end, start, ...props }) => {
  const dispatch = useDispatch();
  const show = () => dispatch(actions.show());
  const hide = () => dispatch(actions.hide());
  return (
    <KeyboardDatePicker
      autoOk
      style={{ width: '100%' }}
      variant="inline"
      inputVariant="outlined"
      format="DD/MM/YYYY"
      onFocus={show}
      onBlur={hide}
      InputAdornmentProps={{ position: 'end' }}
      {...props}
    />
  );
};

export default Input;
