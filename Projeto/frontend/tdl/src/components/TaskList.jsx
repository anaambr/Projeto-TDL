import React from "react";
import "./TaskList.css";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TaskList({
  title,
  icon,
  tasks = [],
  selectedTask,
  onSelect,
  onToggleStatus,
  onDelete,
  variant = "dark",
}) {

  const navigate = useNavigate();

  return (
    <div className={`tasklist-container ${variant}`}>
      <h3 className="tasklist-title">
        {icon} {title}
      </h3>
      <hr />

      {tasks.length === 0 ? (
        <p className="empty-text">Nenhuma tarefa.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${selectedTask?.id === task.id ? "selected" : ""}`}
            onClick={() => onSelect(task)}
          >
            <span className="task-title-text">
              {task.title}

              <span className="deadline">
                {task.status === "concluida"
                  ? " (concluída)"
                  : task.days_left === 0
                  ? " (vence hoje)"
                  : task.days_left < 0
                  ? ` (atrasada há ${Math.abs(task.days_left)} dias)`
                  : ` (faltam ${task.days_left} dias)`
                }
              </span>
            </span>

            <div className="task-actions">

              {/* BOTÃO CONCLUIR */}
              {task.status !== "concluida" && (
                <button
                  className="done-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStatus(task);
                  }}
                >
                  <FaCheck />
                </button>
              )}

              {/* EDITAR */}
              <FaEdit
                className="edit-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(task);
                  navigate(`/edit-task/${task.id}`);
                }}
              />

              {/* EXCLUIR */}
              <FaTrash
                className="delete-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task);
                }}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
