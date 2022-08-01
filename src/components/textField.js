import { TextField } from "@material-ui/core";
import React from 'react'
import "./toDoForm.css";

export const renderTextField = ({
  label,
  input,
  meta: { touched, error },
  ...custom
}) => (
  <div>
    <TextField
      id="filled-basic"
      variant="filled"
      label={label}
      placeholder={label}
      {...input}
      {...custom}
    /><br />
    {touched && 
      (error && 
        <span className="vErrorText">{label}{error}</span>
    )}
  </div>
)