import React from "react";
import "./WeeklyTasks.css";

const WeeklyTasks = ({ icon }) => (
  <section className="weekly card--dark">
    <h3>
      {icon && <span className="icon">{icon}</span>}
      Esta semana...
    </h3>
    <div className="task-items">
      {[...Array(4)].map((_, i) => (
        <label key={i}>
          <input type="checkbox" /> Tarefa_{i + 1}
        </label>
      ))}
    </div>
  </section>
);

export default WeeklyTasks;
