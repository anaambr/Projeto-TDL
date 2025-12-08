import React from "react";
import "./WeeklyTasks.css";
import { FaBullhorn } from "react-icons/fa";

export default function WeeklyTasks({ tasks = [] }) {

  return (
    <div className="weekly-container">
      <h3 className="weekly-title">
        <FaBullhorn className="weekly-icon" /> Esta semana...
      </h3>
      <hr />

      {tasks.length === 0 ? (
        <p className="empty-week">Nenhuma tarefa.</p>
      ) : (
        tasks.map((task) => (
          <label key={task.id} className="weekly-item">
            <input type="checkbox" checked={task.status === "concluida"} readOnly />
            {task.title}
          </label>
        ))
      )}
    </div>
  );
}
