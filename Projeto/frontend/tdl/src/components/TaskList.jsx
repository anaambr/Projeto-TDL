import React from "react";
import "./TaskList.css";

const TaskList = ({
  title,
  gray,
  dark,
  icon,
  tasks = [],
  loading,
  error,
  onToggleStatus,
  onDelete,
  onEdit,
}) => {
  const classNames = [
    "task-list",
    gray ? "gray" : "",
    dark ? "card--dark" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classNames}>
      <h3>
        {icon && <span className="icon">{icon}</span>}
        {title}
      </h3>

      {loading && <p>Carregando...</p>}
      {error && <p className="task-error">{error}</p>}

      <div className="task-items">
        {tasks.map((task) => (
          <div key={task.id} className="task-row">
            <label>
              <input
                type="checkbox"
                checked={task.status === "concluida"}
                onChange={() => onToggleStatus(task)}
              />
              {task.title}
            </label>

            <div className="task-actions">
              <button
                className="task-edit-btn"
                onClick={() => onEdit(task)}
              >
                ✏️
              </button>
              <button
                className="task-delete-btn"
                onClick={() => onDelete(task)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}

        {!loading && tasks.length === 0 && (
          <p className="task-empty">Nenhuma tarefa encontrada.</p>
        )}
      </div>
    </section>
  );
};

export default TaskList;
