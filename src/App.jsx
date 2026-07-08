import { useEffect, useState } from "react";
import "./App.css";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import SearchBar from "./components/SearchBar";
import FilterButtons from "./components/FilterButtons";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./services/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Load Todos
  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add Todo
  const addTodo = async (todo) => {
    try {
      await createTodo(todo);
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  // Update Todo
  const handleUpdate = async (id, todo) => {
    try {
      await updateTodo(id, todo);
      setEditTodo(null);
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Todo
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this todo?")) return;

    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  // Toggle Complete
  const toggleComplete = async (todo) => {
    try {
      await updateTodo(todo.id, {
        title: todo.title,
        description: todo.description,
        completed: !todo.completed,
      });

      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  // Search + Filter
  const filteredTodos = todos.filter((todo) => {
    const matchSearch =
      todo.title.toLowerCase().includes(search.toLowerCase()) ||
      todo.description.toLowerCase().includes(search.toLowerCase());

    if (filter === "completed") {
      return matchSearch && todo.completed;
    }

    if (filter === "pending") {
      return matchSearch && !todo.completed;
    }

    return matchSearch;
  });

  return (
    <div className="container">
      <h1>📝 Todo App</h1>

      <TodoForm
        addTodo={addTodo}
        editTodo={editTodo}
        updateTodo={handleUpdate}
        cancelEdit={() => setEditTodo(null)}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <FilterButtons
        filter={filter}
        setFilter={setFilter}
      />

      <TodoList
        todos={filteredTodos}
        onEdit={setEditTodo}
        onDelete={handleDelete}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;