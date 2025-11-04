import React from "react";
import "./TaskList.css";

const TaskList = ({ title, count, gray, dark, icon }) => {
  const classNames = [
    "task-list",
    gray ? "gray" : "",
    dark ? "card--dark" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classNames}>
      <h3>
        {icon && <span className="icon">{icon}</span>}
        {title}
      </h3>
      <div className="task-items">
        {[...Array(count)].map((_, i) => (
          <label key={i}>
            <input type="checkbox" />
            {title}_Task_{i + 1}
          </label>
        ))}
      </div>
    </section>
  );
};

export default TaskList;
