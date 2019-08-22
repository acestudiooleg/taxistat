/* eslint-disable react/prop-types */
import React from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const Input = ({ end, start, ...props }) => (
  <TextField
    style={{ width: '100%' }}
    margin="normal"
    variant="outlined"
    InputProps={{
      endAdornment: end && <InputAdornment position="end">{end}</InputAdornment>,
      startAdornment: start && <InputAdornment position="start">{start}</InputAdornment>,
    }}
    {...props}
  />
);

export default Input;
