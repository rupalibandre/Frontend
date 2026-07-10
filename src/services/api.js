import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-jpo6.onrender.com",
});

export const getTodos = () => API.get("/todos/");

export const createTodo = (todo) => API.post("/todos/", todo);

export const updateTodo = (id, todo) => API.put(`/todos/${id}`, todo);

export const deleteTodo = (id) => API.delete(`/todos/${id}`);