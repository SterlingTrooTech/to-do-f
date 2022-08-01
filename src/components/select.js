import {
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@material-ui/core";
import React from 'react';

export const RenderSelect = ({
  label,
  input,
  meta: { touched, error },
  ...custom
}) => ( 
  <>
    <FormControl variant="filled" sx={{ minWidth: 180 }}>
      <InputLabel id={`label-${label}`}>{label}</InputLabel>
      <Select
        labelId={`label-${label}`}
        id={label}
        {...input}
        {...custom}
      >
        <MenuItem value=""> <em>None</em> </MenuItem>
        <MenuItem value="Active"> Active </MenuItem>
        <MenuItem value="In-Active"> In-Active </MenuItem>
      </Select>
    </FormControl><br />
    {touched && 
      (error && 
        <span className="vErrorText">{label}{error}</span>
    )}
  </>
);