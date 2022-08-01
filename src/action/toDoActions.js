import {
  RETRIEVE_TODOS,
  UPDATE_TODO,
  DELETE_TODO,
  DELETE_TODOS,
  GET_TODO
} from "./types";
import toDoService from "../services/toDoApi"

export const addToDo = (data) => async (dispatch) => {
  try{
    const res = await toDoService.create(data);
    console.log(res);
    return Promise.resolve(res);
  } catch(err) {
    return Promise.reject(err);
  }
};

export const getAllToDos = () => async (dispatch) => {
  try{
    const res = await toDoService.getAll();

    dispatch({
      type: RETRIEVE_TODOS,
      payload: res.data
    })
  } catch(err) {
    console.log(err);
  }
};

export const getToDo = (id) => (dispatch) => {
  try{
    dispatch({
      type: GET_TODO,
      payload: id
    })
  } catch(err) {
    console.log(err);
  }
};

export const updateToDo = (id, data) => async (dispatch) => {
  try{
    const res = await toDoService.update(id, data);

    dispatch({
      type: UPDATE_TODO,
      payload: res.data
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteToDo = (id) => async (dispatch) => {
  try{
    await toDoService.remove(id);
    
    dispatch({
      type: DELETE_TODO,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAlToDo = () => async (dispatch) => {
  try{
    const res = await toDoService.removeAll();

    dispatch({
      type: DELETE_TODOS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};