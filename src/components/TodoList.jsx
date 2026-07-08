import TodoCard from "./TodoCard";

function TodoList({
  todos,
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Todos Found 😔</h2>
        <p>Add your first todo to get started.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
}

export default TodoList;