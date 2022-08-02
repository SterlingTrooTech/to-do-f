import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./toDoForm.css";
import { getAllToDos } from '../action/toDoActions';
import { deleteToDo, deleteAlToDo } from '../action/toDoActions';
import { DeleteToDoAlert } from './deleteAlert';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

const ToDoList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [dataId,setDataId] = useState(0);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    dispatch(getAllToDos());
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    id? setDataId(id) : setDataId()
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeToDo = (id) => {
    setOpen(false);
    id
      ? dispatch(deleteToDo(id))
      : dispatch(deleteAlToDo());
  }

  const toDos = useSelector(state => state?.toDoReducer.toDoList);

  return(
    <div className="form2">
      <div className='tableTitle'>To-Do's</div><DeleteSweepIcon onClick={() => handleClickOpen()} />
      <div className='table1'>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Hobbies</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Task Name</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {toDos?.length > 0 && toDos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {data.userName}
                  </TableCell>
                  <TableCell align="right">{data.gender}</TableCell>
                  <TableCell align="right">
                    {data.hobbies
                      .map((values) => (values))
                      .join(", ")
                    }</TableCell>
                  <TableCell align="right">{data.age}</TableCell>
                  <TableCell align="right">{data.date.substring(0, 10)}</TableCell>
                  <TableCell align="right">{data.taskName}</TableCell>
                  <TableCell align="right">{data.status}</TableCell>
                  <TableCell align="right">
                    <Link to = {"/todos/" + data.id}>
                      <EditIcon />
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <Link>
                      <DeleteIcon onClick={() => handleClickOpen(data.id)} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5]}
          count={toDos?.length || 0 }
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
      <DeleteToDoAlert
        open={open}
        dataId={dataId}
        handleClose={() => handleClose()}
        agree={(_id) => removeToDo(_id)}
      />
    </div>
    </div>
  )
}

export default ToDoList;