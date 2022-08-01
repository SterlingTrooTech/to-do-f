import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./toDoForm.css";
import { Button } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';

import { updateToDo } from '../action/toDoActions';
import { renderTextField } from './textField';
import { renderRadioButton } from './radioButton';
import RenderCheckboxGroup from './checkBoxGroup';
import { RenderSelect } from './select';
import { datePicker } from './datePicker';
import { RenderAgeSlider } from './ageSlider';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

let initialValues = {}

const initializeValues = (data) => {
  initialValues = data
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

const optionsList = [{id: 1, name: 'Sports'}, {id: 2, name: 'Reading'}, {id: 3, name: 'Music'}]

const ToDoEdit = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const id = props.match.params.id;
  const dispatch = useDispatch();

  const filterData = (values) => {
    // eslint-disable-next-line
    return values.id === id
  }

  const toDos = useSelector(state => state?.toDoReducer.toDoList);
  const toDo = toDos.find(filterData);


  if(id){
    initializeValues(toDo)
  }

  const EditToDo = (values) => {
    dispatch(updateToDo(id, values))
  }

  return(
    <>
      <div className='table1'>
      <div className='tableTitle'>To-Do</div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Hobbies</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Task Name</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {toDo.userName}
                </TableCell>
                <TableCell align="right">{toDo.gender}</TableCell>
                <TableCell align="right">
                  {toDo.hobbies
                    .map((values) => (values))
                    .join(", ")
                  }</TableCell>
                <TableCell align="right">{toDo.age}</TableCell>
                <TableCell align="right">{toDo.date.substring(0, 10)}</TableCell>
                <TableCell align="right">{toDo.taskName}</TableCell>
                <TableCell align="right">{toDo.status}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      
        <div className='form1'>
        <form onSubmit={handleSubmit(EditToDo)}>
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
        </form>
        </div>
      </div>
    </>
  );
};

export default reduxForm({
  form: 'ToDoEdit',
  enableReinitialize : true,
  validate,
  initialValues
})(ToDoEdit);