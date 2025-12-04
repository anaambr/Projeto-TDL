import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import Calendar from "./components/Calendar";
import WeeklyTasks from "./components/WeeklyTasks";
import AddTask from "./components/AddTask";
import { Link } from "react-router-dom";


import Achievements from "./components/Achievements";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import SavedItems from "./components/SavedItems";

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
            <Link to="/add-task" className="cadastrar-tarefa">+</Link>
          </header>

          <Routes>
            <Route
              path="/"
              element={
                <div className="dashboard-grid">

                  <div className="calendar-full">
                    <Calendar />
                  </div>

                  <div className="left-column">
                    <WeeklyTasks icon={<FaBullhorn />} />
                  </div>

                  <div className="right-column">
                    <TaskList title="Pendentes" style="color: red"count={2} red icon={<FaClock />} />
                  </div>

                </div>
              }
            />

            <Route path="/profile" element={<Profile />} />
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
