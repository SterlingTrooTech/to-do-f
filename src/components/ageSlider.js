import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FormLabel } from "@material-ui/core";

export const RenderAgeSlider = ({
  label,
  input,
  meta: { touched, error },
  ...custom
}) => (
  <>
    <Box sx={{ width: 250 }}>
      <FormLabel component="legend">
        {label} {input.value}
        {touched && 
          (error && 
            <span className="vErrorText"> {label}{error}</span>
        )}
      </FormLabel>
      <Slider
        aria-labelledby="input-slider"
        aria-label="Default"
        min={18}
        max={55}
        step={1}
        valueLabelDisplay="auto"
        {...input}
        {...custom}
      />
    </Box>
  </>
);