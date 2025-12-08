import React from "react";
import "./TaskList.css";

import { FaEdit, FaTrash } from "react-icons/fa";

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
            className={`task-item ${
              selectedTask?.id === task.id ? "selected" : ""
            }`}
            onClick={() => onSelect(task)}
          >
            <input
              type="checkbox"
              checked={task.status === "concluida"}
              onChange={(e) => {
                e.stopPropagation();
                onToggleStatus(task);
              }}
            />

            <span className="task-title-text">
              {task.title}
              {task.days_left !== null && (
                <span className="deadline">
                  {task.days_left === 0
                    ? " (vence hoje)"
                    : task.days_left < 0
                    ? ` (atrasada há ${Math.abs(task.days_left)} dias)`
                    : ` (faltam ${task.days_left} dias)`}
                </span>
              )}
            </span>

            <div className="task-actions">
              <FaEdit
                className="edit-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(task);
                }}
              />
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
