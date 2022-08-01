import React from 'react';
import {
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
  Checkbox,
} from "@material-ui/core";

class RenderCheckboxGroup extends React.Component {
  checkboxGroup() {
    let { options, input } = this.props;
    return options.map((option, index) => {
      return (
        <FormControlLabel
          value={option.name}
          key={index}
          control={
            <Checkbox 
              name={`${input.name}[${index}]`}
              value={option.name}
              checked={input.value.indexOf(option.name) !== -1}
              onChange={(event) => {
                const newValue = [...input.value];
                if (event.target.checked) {
                    newValue.push(option.name);
                } else {
                    newValue.splice(newValue.indexOf(option.name), 1);
                }

                return input.onChange(newValue);
              }}
            />
          }
          label={option.name}
          labelPlacement="end"
        />
      )
    });
  }

  render() {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Hobbies</FormLabel>
        <FormGroup aria-label="position" row>
          {this.checkboxGroup()}
        </FormGroup>
      </FormControl>
    )
  }
}

export default RenderCheckboxGroup;