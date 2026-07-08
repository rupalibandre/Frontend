import { useState, useEffect } from "react";

function TodoForm({ addTodo, editTodo, updateTodo, cancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setDescription(editTodo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const todoData = {
      title,
      description,
      completed: editTodo ? editTodo.completed : false,
    };

    if (editTodo) {
      updateTodo(editTodo.id, todoData);
    } else {
      addTodo(todoData);
    }

    setTitle("");
    setDescription("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <div className="form-buttons">
        <button type="submit">
          {editTodo ? "Update Todo" : "Add Todo"}
        </button>

        {editTodo && (
          <button
            type="button"
            className="cancel-btn"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TodoForm;