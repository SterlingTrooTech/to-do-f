import {
  RETRIEVE_TODOS,
  UPDATE_TODO,
  DELETE_TODO,
  DELETE_TODOS,
  GET_TODO,
} from "../action/types";

const initialState = {
  toDoList: [],
  loading: false,
  toDoEdit: {
    userName: "",
    age: '',
    date: "",
    gender: "",
    hobbies: [],
    id: "",
    status: ``,
    taskName: "",
  }
};

const toDoReducer = ( state = initialState, action ) => {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_TODOS:
      return { toDoList: payload}

    case GET_TODO:
      if(payload)
      { 
        return {
          toDoEdit: state?.toDoList?.find((val) => val.id === payload)
        }
      } else {
        return { 
          toDoEdit: {
            userName: "",
            age: '',
            date: "",
            gender: "male",
            hobbies: [],
            id: "",
            status: ``,
            taskName: "",
          }
        }
      }
      
    case UPDATE_TODO:
      return {toDoList: state?.toDoList?.map((toDo) => {
        if(toDo.id === payload.id) {
          return{
            ...toDo,
            ...payload
          };
        } else {
          return toDo;
        }
      })};

    case DELETE_TODO:
      return {toDoList: state.toDoList.filter((val) => val.id !== payload.id)}

    case DELETE_TODOS:
      return [];

    default:
      return state;
    
  }
}

export default toDoReducer;