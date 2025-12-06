import React, { useState, useEffect } from "react";
import "./Operations.css";

const Operations = ({ onCreateTask, onUpdateTask, editingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (editingTask) {
      onUpdateTask(editingTask.id, { title, description });
    } else {
      onCreateTask(title, description);
    }

    setTitle("");
    setDescription("");
  };

  return (
    <section className="operations gray">
      <h3>{editingTask ? "Editar Tarefa" : "Nova Tarefa"}</h3>

      <form className="operations-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">
          {editingTask ? "Salvar Alterações" : "Adicionar Tarefa"}
        </button>
      </form>
    </section>
  );
};

export default Operations;
