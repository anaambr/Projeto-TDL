import React from "react";

function AddTask() {
  return (
    <div className="add-task">
      <h1>Cadastrar Tarefa</h1>
      <form>
        <input type="text" placeholder="Título da tarefa" />
        <textarea placeholder="Descrição"></textarea>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default AddTask;
