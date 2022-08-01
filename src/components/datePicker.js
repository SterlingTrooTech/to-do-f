import React from 'react';
import TextField from '@mui/material/TextField';

export const datePicker = ({
  label,
  input,
  meta: { touched, error },
  ...custom
}) => (
  <div>
    <TextField
      id="date"
      variant="filled"
      label={label}
      placeholder={label}
      {...input}
      {...custom}
      type="date"
      sx={{ width: 230 }}
      InputLabelProps={{
        shrink: true,
      }}
    /><br />
    {touched && 
      (error && 
        <span className="vErrorText">{label}{error}</span>
    )}
  </div>
);
