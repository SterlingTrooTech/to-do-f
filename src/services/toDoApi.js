import http from "../http-common";

const getAll = () => {
  return http.get("/todos");
};

const create = data => {
  return http.post("/todos", data);
};

const update = (id, data) => {
  return http.put(`/todos/${id}`, data);
};

const remove = id => {
  return http.delete(`/todos/${id}`);
};

const removeAll = () => {
  return http.delete("/todos");
};

const toDoService = {
  getAll,
  create,
  update,
  remove,
  removeAll
};

export default toDoService;