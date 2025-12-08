import React from "react";
import { useNavigate } from "react-router-dom";

import "./Operations.css";
import { FaPlus, FaEdit } from "react-icons/fa";

export default function Operations({ selectedTask }) {
  const navigate = useNavigate();

  return (
    <div className="operations-box">
      <h3 className="operations-title">Operações</h3>
      <hr />

      <div className="op-item" onClick={() => navigate("/add-task")}>
        <FaPlus className="op-icon" />
        <span>Adicionar tarefa</span>
      </div>

      <div
        className={`op-item ${!selectedTask ? "disabled" : ""}`}
        onClick={() => selectedTask && navigate(`/edit-task/${selectedTask.id}`)}
      >
        <FaEdit className="op-icon" />
        <span>Editar tarefa</span>
      </div>
    </div>
  );
}