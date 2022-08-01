import axios from "axios";

export default axios.create({
  baseURL: "https://s-to-do-be.herokuapp.com/todo",
  headers: {
    "Content-type": "application/json"
  }
});