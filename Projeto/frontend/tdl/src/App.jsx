import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// COMPONENTES
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import Calendar from "./components/Calendar";
import WeeklyTasks from "./components/WeeklyTasks";
import Operations from "./components/Operations";

import Achievements from "./components/Achievements";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import SavedItems from "./components/SavedItems";
import Chat from "./components/Chat";

import { FaClipboardList, FaLightbulb, FaClock, FaBullhorn } from "react-icons/fa";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />

        <main className="main">

          <header className="top-bar glass">
            <input type="text" placeholder="Pesquisar tarefa..." />
            <span className="bell">🔔</span>
          </header>

          <Routes>
            {/* 🟦 Home / Dashboard */}
            <Route
              path="/"
              element={
                <div className="dashboard-grid">

                  {/* Coluna 1 */}
                  <TaskList
                    title="Tarefas"
                    count={6}
                    dark
                    icon={<FaClipboardList />}
                    className="tarefas-card"
                  />

                  {/* Coluna 2 */}
                  <div className="mid-column">
                    <TaskList title="Prioridade" count={4} gray icon={<FaLightbulb />} />
                    <TaskList title="Pendentes" count={2} gray icon={<FaClock />} />
                    <Operations />
                  </div>

                  {/* Coluna 3 */}
                  <div className="right-column">
                    <Calendar />
                    <WeeklyTasks icon={<FaBullhorn />} />
                  </div>
                </div>
              }
            />

            {/* 🟪 Telas Secundárias */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/saved" element={<SavedItems />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
