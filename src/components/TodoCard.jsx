function TodoCard({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  return (
    <div className={`todo-card ${todo.completed ? "completed" : ""}`}>
      <h3>{todo.title}</h3>

      <p>{todo.description}</p>

      <p>
        <strong>Status:</strong>{" "}
        {todo.completed ? "✅ Completed" : "🟡 Pending"}
      </p>

      <div className="todo-buttons">
        <button
          className="complete-btn"
          onClick={() => onToggleComplete(todo)}
        >
          {todo.completed ? "Mark Pending" : "Mark Complete"}
        </button>

        <button
          className="edit-btn"
          onClick={() => onEdit(todo)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoCard;