import React, { useState, forwardRef } from 'react';
import { Button } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';
import { addToDo } from '../../action/toDoActions';

// import { Snackbar } from './snackbar';
import { renderTextField } from '../textField';
import { renderRadioButton } from '../radioButton';
import RenderCheckboxGroup from '../checkBoxGroup';
import { RenderSelect } from '../select';
import { datePicker } from '../datePicker';
import { RenderAgeSlider } from '../ageSlider';
import "./toDoForm.css";

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const optionsList = [{id: 1, name: 'Sports'}, {id: 2, name: 'Reading'}, {id: 3, name: 'Music'}]

const initialValues = {
  userName: "Luffy",
  gender: "male",
  hobbies: ['Sports'],
  age: 23,
  date: "2022-07-31T18:30:00.000Z",
  taskName: "OPFR",
  status: "Active"
}

const validate = values => {
  const errors = {}
  const requiredFields = [
    'userName',
    'gender',
    'age',
    'date',
    'taskName',
    'status'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = ' is Required'
    }
  });
  if ( !/^[a-zA-Z ]*$/i.test(values.userName) ) {
    errors.userName = ' can only have alphabets and white space'
  } else if (values?.userName?.length > 15) {
    errors.userName = 'Must be 15 characters or less'
  }
  return errors
}

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

let ToDoForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const NewToDo = (values) => {
    dispatch(addToDo(values)).then(setOpen(true))
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className='form1'>
      <form onSubmit={handleSubmit(NewToDo, {reset})}>
        <div className='rows'>
          <Field name="userName" component={renderTextField} label="User Name" />
        </div>
        <div className='rows'>
          <Field name="gender" component={renderRadioButton} label="Gender" />
        </div>
        <div className='rows'>
          <Field name="hobbies" component={RenderCheckboxGroup} options={optionsList}/>
        </div>
        <div className='rows'>
          <Field name="age" component={RenderAgeSlider} label="Age" />
        </div>
        <div className='rows'>
          <Field name="date" component={datePicker} label="Date" />
        </div>
        <div className='rows'>
          <Field name="taskName" component={renderTextField} label="Task Name" />
        </div>
        <div className='rows'>
          <Field name="status" component={RenderSelect} label="Status" />
        </div>
        <div className='rows'>
          <Button variant="outlined" type="submit" disabled={pristine || submitting}>Submit</Button>
          <Button variant="outlined" disabled={pristine || submitting} onClick={reset}>Reset</Button>
        </div>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              To Do Added Successfully
            </Alert>
          </Snackbar>
        </Stack>

      </form>
    </div>
  );
};

ToDoForm = reduxForm({
  form: 'addToDo',
  enableReinitialize : true,
  validate,
  initialValues
})(ToDoForm);

export default ToDoForm;
