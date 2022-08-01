import React, {useEffect } from 'react';
import {useState} from 'react';
import { useDispatch, connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import "./toDoForm.css";

import { Button } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';

import { updateToDo, addToDo, getToDo } from '../action/toDoActions';
import validate from './validate';
import { SnackBarSuccess } from './snackbar';
import { renderTextField } from './textField';
import { renderRadioButton } from './radioButton';
import RenderCheckboxGroup from './checkBoxGroup';
import { RenderSelect } from './select';
import { datePicker } from './datePicker';
import { RenderAgeSlider } from './ageSlider';

const optionsList = [{id: 1, name: 'Sports'}, {id: 2, name: 'Reading'}, {id: 3, name: 'Music'}]

let ToDoMForm = (props) => {
  const { handleSubmit, load, pristine, reset, submitting } = props;
  const id = props.match.params.id;  
  const dispatch = useDispatch();
  let history = useHistory();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    load(id)
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const FormSubmit = async (values) => {
    if(id){
      dispatch(updateToDo(id, values)).then((res) => {
        if(res.status === 200){
          history.push("/todos")
        }
      })
      setOpen(true)
    } else {
      dispatch(addToDo(values)).then((res) => {
        if(res.status === 200){
          history.push("/todos")
        }
      })
      setOpen(true)
    }
  }
   

  return(
    <div className='wrapper'>
      <div className='form1'>
        <p className='tableTitle'>{id?  "Edit To-Do" : "Add To-Do" }</p>
        <form onSubmit={handleSubmit(FormSubmit)}>
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
          <SnackBarSuccess open={open} handleClose={() => handleClose()} />
        </form>
      </div>
    </div>
  );
};

ToDoMForm = reduxForm({
  form: 'ToDoMForm',
  validate,
})(ToDoMForm);

ToDoMForm = connect(
  state => ({
    initialValues: state.toDoReducer.toDoEdit
  }),     
  { load: getToDo }
)(ToDoMForm)

export default ToDoMForm;