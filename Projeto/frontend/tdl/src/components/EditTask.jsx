import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiGetTaskById, apiUpdateTask } from "../api";

import "./TaskPages.css";
import "./AddEditTask.css";

export default function EditTask({ token, onUpdateTask }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "normal",
    data_limite: "",
  });

  useEffect(() => {
    async function loadTask() {
      try {
        const data = await apiGetTaskById(token, id);

        const task = data.task || data; // ← cobre os 2 formatos

        setForm({
          title: task.title || "",
          description: task.description || "",
          priority: task.priority || "normal",
          data_limite: task.data_limite || "",
        });
      } catch (err) {
        alert("Erro ao carregar tarefa: " + err.message);
      }
    }

    loadTask();
  }, [id, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: form.title,
        description: form.description,
        priority: form.priority,
        data_limite: form.data_limite,
      };

      const data = await apiUpdateTask(token, id, payload);

      if (onUpdateTask) onUpdateTask(data.task || data);

      navigate("/");
    } catch (err) {
      alert("Erro ao editar tarefa: " + err.message);
    }
  };

  return (
    <div className="task-page-container">
      <div className="task-card">
        <h2 className="task-title">Editar tarefa</h2>
        <hr className="divider" />

        <form className="task-form" onSubmit={handleSubmit}>
          <label className="section-title">Informações da tarefa</label>

          <input
            type="text"
            name="title"
            placeholder="Tarefa"
            value={form.title}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="normal">Nível de prioridade</option>
            <option value="alta">Alta prioridade</option>
            <option value="urgente">Urgente</option>
          </select>

          <input
            type="date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
          />
          
          <textarea
            name="description"
            placeholder="Descrição..."
            value={form.description}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="task-btn">
            Editar
          </button>
        </form>
      </div>
    </div>
  );
}
