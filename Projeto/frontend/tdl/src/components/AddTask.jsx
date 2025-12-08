import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCreateTask } from "../api";
import "./TaskPages.css";
import "./AddEditTask.css";
import { unlockAchievement } from "../utils/achievements";

export default function AddTask({ token, onCreateTask }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "normal",
    due_date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: form.title,
        description: form.description || null,
        priority: form.priority,
        due_date: form.due_date || null,
      };

      const data = await apiCreateTask(token, payload);

      if (onCreateTask) onCreateTask(data.task);

      // 🏆 CONQUISTA: PRIMEIRA TAREFA
      unlockAchievement("Primeira tarefa concluída");

      navigate("/");
    } catch (err) {
      alert("Erro ao criar tarefa: " + err.message);
    }
  };

  return (
    <div className="task-page-container">
      <div className="task-card">
        <h2 className="task-title">Adicionar tarefa</h2>
        <hr className="divider" />

        <form className="task-form" onSubmit={handleSubmit}>
          <label className="section-title">Informações da tarefa</label>

          <input
            type="text"
            name="title"
            placeholder="Tarefa"
            value={form.title}
            onChange={handleChange}
            required
          />

          <select name="priority" value={form.priority} onChange={handleChange}>
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
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
