import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import Calendar from "./components/Calendar";
import Operations from "./components/Operations";

import Achievements from "./components/Achievements";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Register from "./components/Register";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";

import { apiGetTasks, apiUpdateTask, apiDeleteTask } from "./api";

import "./App.css";
import { FaClipboardList, FaLightbulb, FaClock } from "react-icons/fa";

// Rota protegida
const ProtectedRoute = ({ token, children }) => {
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  const [auth, setAuth] = useState({ token: null, user: null });
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (t && u) {
      setAuth({ token: t, user: JSON.parse(u) });
    }
  }, []);

  // carregar tarefas
  useEffect(() => {
    if (!auth.token) return;

    let cancelled = false;

    async function loadTasks() {
      try {
        const data = await apiGetTasks(auth.token, search);
        if (!cancelled) setTasks(data);
      } catch (err) {
        console.error(err);
        if (!cancelled) setTasks([]);
      }
    }

    loadTasks();
    return () => {
      cancelled = true;
    };
  }, [auth.token, search]);

  // login
  const handleLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setAuth({ token: data.token, user: data.user });
  };

  // logout
  const handleLogout = () => {
    localStorage.clear();
    setAuth({ token: null, user: null });
    setTasks([]);
    setSelectedTask(null);
  };

  const handleCreateTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const handleUpdateTaskLocal = (updatedTask) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    if (selectedTask?.id === updatedTask.id) {
      setSelectedTask(updatedTask);
    }
  };

  const toggleTaskStatus = async (task) => {
  const newStatus = task.status === "concluida" ? "pendente" : "concluida";

  try {
    const res = await apiUpdateTask(auth.token, task.id, { status: newStatus });
    const updated = res.task || res;

    handleUpdateTaskLocal(updated);

  } catch (err) {
    alert("Erro ao atualizar status: " + err.message);
  }
};


  const handleDeleteTask = async (task) => {
    try {
      await apiDeleteTask(auth.token, task.id);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
      if (selectedTask?.id === task.id) setSelectedTask(null);
    } catch (err) {
      alert("Erro ao deletar: " + err.message);
    }
  };

  const pending = tasks.filter((t) => t.status === "pendente");

  const priority = pending.filter((t) => t.priority !== "normal");

  return (
    <Router>
      <div className="container">
        {auth.token && <Sidebar user={auth.user} onLogout={handleLogout} />}

        <main className="main">
          <Routes>
            {/* LOGIN */}
            <Route
              path="/login"
              element={
                auth.token ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
              }
            />

            {/* REGISTER */}
            <Route
              path="/register"
              element={
                auth.token ? <Navigate to="/" replace /> : <Register />
              }
            />

            {/* DASHBOARD */}
            <Route
              path="/"
              element={
                <ProtectedRoute token={auth.token}>
                  <>
                    <header className="top-bar">
                      <input
                        type="text"
                        placeholder="Pesquisar tarefa..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </header>

                    <div className="dashboard-grid">
                      <TaskList
                        title="Tarefas"
                        icon={<FaClipboardList />}
                        variant="dark"
                        tasks={tasks}
                        selectedTask={selectedTask}
                        onSelect={setSelectedTask}
                        onToggleStatus={toggleTaskStatus}
                        onDelete={handleDeleteTask}
                      />

                      {/* Coluna 2 */}
                      <div className="mid-column">
                        <TaskList
                          title="Prioridade"
                          icon={<FaLightbulb />}
                          variant="gray"
                          tasks={priority}
                          selectedTask={selectedTask}
                          onSelect={setSelectedTask}
                          onToggleStatus={toggleTaskStatus}
                          onDelete={handleDeleteTask}
                        />

                        <TaskList
                          title="Pendentes"
                          icon={<FaClock />}
                          variant="gray"
                          tasks={pending}
                          selectedTask={selectedTask}
                          onSelect={setSelectedTask}
                          onToggleStatus={toggleTaskStatus}
                          onDelete={handleDeleteTask}
                        />

                        
                      </div>

                      {/* Coluna 3 */}
                      <div className="right-column">
                        <Calendar />
                        <Operations selectedTask={selectedTask} />
                      </div>
                    </div>
                  </>
                </ProtectedRoute>
              }
            />

            {/* ADD TASK */}
            <Route
              path="/add-task"
              element={
                <ProtectedRoute token={auth.token}>
                  <AddTask token={auth.token} onCreateTask={handleCreateTask} />
                </ProtectedRoute>
              }
            />

            {/* EDIT TASK */}
            <Route
              path="/edit-task/:id"
              element={
                <ProtectedRoute token={auth.token}>
                  <EditTask token={auth.token} onUpdateTask={handleUpdateTaskLocal} />
                </ProtectedRoute>
              }
            />

            {/* OUTRAS PÁGINAS */}
            <Route path="/profile" element={<ProtectedRoute token={auth.token}><Profile user={auth.user} /></ProtectedRoute>} />
            <Route path="/achievements" element={<ProtectedRoute token={auth.token}><Achievements /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute token={auth.token}><Settings /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
  
}
