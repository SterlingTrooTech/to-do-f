import { combineReducers } from "redux";
import toDoReducer from "./toDoReducer";
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  form: formReducer,
  toDoReducer
});