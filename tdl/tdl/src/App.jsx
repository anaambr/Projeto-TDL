import React from "react";
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import Calendar from "./components/Calendar";
import WeeklyTasks from "./components/WeeklyTasks";
import Operations from "./components/Operations";
import { FaClipboardList, FaLightbulb, FaClock, FaBullhorn } from "react-icons/fa";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <header className="top-bar glass">
          <input type="text" placeholder="Pesquisar tarefa..." />
          <span className="bell">🔔</span>
        </header>

        <div className="dashboard-grid">
          {/* Coluna 1: Tarefas */}
          <TaskList title="Tarefas" count={6} dark icon={<FaClipboardList />} className="tarefas-card" />

          {/* Coluna 2: Prioridade, Pendentes, Operações */}
          <div className="mid-column">
            <TaskList title="Prioridade" count={4} gray icon={<FaLightbulb />} />
            <TaskList title="Pendentes" count={2} gray icon={<FaClock />} />
            <Operations />
          </div>

          {/* Coluna 3: Calendário e Esta semana */}
          <div className="right-column">
            <Calendar />
            <WeeklyTasks icon={<FaBullhorn />} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
