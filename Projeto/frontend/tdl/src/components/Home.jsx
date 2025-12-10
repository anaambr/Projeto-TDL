import React from "react";
import Calendar from "./Calendar";

import "./Home.css";

const Home = () => {
  return (
    <div className="dashboard-grid">

      {/* COLUNA ESQUERDA — TAREFAS */}
      <div className="dashboard-left">
        <div className="card-blue">
          <h2>📋 Tarefas</h2>
          <div className="card-separator"></div>
          <p>Nenhuma tarefa.</p>
        </div>
      </div>

      {/* COLUNA DO MEIO — PRIORIDADE • PENDENTES */}
      <div className="dashboard-mid">
        <div className="card">
          <h2>💡 Prioridade</h2>
          <div className="card-separator"></div>
          <p>Nenhuma tarefa.</p>
        </div>

        <div className="card">
          <h2>⏳ Pendentes</h2>
          <div className="card-separator"></div>
          <p>Nenhuma tarefa.</p>
        </div>
      </div>

      {/* COLUNA DIREITA — CALENDÁRIO • OPERAÇÕES */}
      <div className="dashboard-right">

        <div className="card calendar-wrapper">
          <Calendar />
        </div>

        <div className="card operations-card">
          <h2>Operações</h2>
          <div className="card-separator"></div>

          <button className="op-btn">
            <span>➕</span> Adicionar tarefa
          </button>

          <button className="op-btn disabled">
            <span>✏️</span> Editar tarefa
          </button>
        </div>

      </div>
    </div>
  );
};

export default Home;
