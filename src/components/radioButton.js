import {
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
import React from 'react'

export const renderRadioButton = ({ 
  input,
  label,
  meta: { touched, error },
  ...rest 
}) => (
  <div>
    <FormLabel component="legend">
      {label} 
      {touched && 
        (error && 
          <span className="vErrorText"> {label}{error}</span>
      )}
    </FormLabel>
    <RadioGroup 
      {...input} 
      {...rest} 
      row
    >
      <FormControlLabel value="male" control={<Radio />} label="Male" />
      <FormControlLabel value="female" control={<Radio />} label="Female" />
    </RadioGroup>
    
  </div>
)