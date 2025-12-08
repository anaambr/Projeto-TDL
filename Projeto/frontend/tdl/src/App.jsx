import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
import Login from "./components/Login";
import Register from "./components/Register";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";

import {
  apiGetTasks,
  apiUpdateTask,
  apiDeleteTask,
} from "./api";

import "./App.css";
import { FaClipboardList, FaLightbulb, FaClock, FaBullhorn } from "react-icons/fa";

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

  // carregar token já salvo
  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (t && u) {
      setAuth({ token: t, user: JSON.parse(u) });
    }
  }, []);

  // carregar tarefas sempre que tiver token ou buscar
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

  // quando AddTask cria tarefa => só adiciona na lista
  const handleCreateTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  // quando EditTask retorna tarefa atualizada
  const handleUpdateTaskLocal = (updatedTask) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    if (selectedTask && selectedTask.id === updatedTask.id) {
      setSelectedTask(updatedTask);
    }
  };

  // alternar status concluída/pendente a partir de TaskList
  const toggleTaskStatus = async (task) => {
    const newStatus = task.status === "concluida" ? "pendente" : "concluida";
    try {
      const res = await apiUpdateTask(auth.token, task.id, { status: newStatus });
      handleUpdateTaskLocal(res.task);
    } catch (err) {
      alert("Erro ao atualizar status: " + err.message);
    }
  };

  // deletar
  const handleDeleteTask = async (task) => {
    try {
      await apiDeleteTask(auth.token, task.id);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
      if (selectedTask?.id === task.id) setSelectedTask(null);
    } catch (err) {
      alert("Erro ao deletar: " + err.message);
    }
  };

  const pending = tasks.filter((t) => t.status !== "concluida");
  const priority = pending.filter((t) => t.priority !== "normal");

  return (
    <Router>
      <div className="container">
        {auth.token && (
          <Sidebar user={auth.user} onLogout={handleLogout} />
        )}

        <main className="main">
          <Routes>
            {/* LOGIN */}
            <Route
              path="/login"
              element={
                auth.token ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />

            {/* REGISTER */}
            <Route
              path="/register"
              element={
                auth.token ? (
                  <Navigate to="/" replace />
                ) : (
                  <Register />
                )
              }
            />

            {/* DASHBOARD */}
            <Route
              path="/"
              element={
                <ProtectedRoute token={auth.token}>
                  <>
                    <header className="top-bar">
                      <div className="bell-pill">🔔</div>
                      <input
                        type="text"
                        placeholder="Pesquisar tarefa..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </header>

                    <div className="dashboard-grid">
                      {/* Coluna 1 - Tarefas */}
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

                      {/* Coluna 2 - Prioridade / Pendentes / Operações */}
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

                        <Operations selectedTask={selectedTask} />
                      </div>

                      {/* Coluna 3 - Calendário / Esta semana */}
                      <div className="right-column">
                        <Calendar />
                        <WeeklyTasks />
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
                  <AddTask
                    token={auth.token}
                    onCreateTask={handleCreateTask}
                  />
                </ProtectedRoute>
              }
            />

            {/* EDIT TASK */}
            <Route
              path="/edit-task/:id"
              element={
                <ProtectedRoute token={auth.token}>
                  <EditTask
                    token={auth.token}
                    onUpdateTask={handleUpdateTaskLocal}
                  />
                </ProtectedRoute>
              }
            />

            {/* OUTRAS PÁGINAS */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute token={auth.token}>
                  <Profile user={auth.user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute token={auth.token}>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved"
              element={
                <ProtectedRoute token={auth.token}>
                  <SavedItems />
                </ProtectedRoute>
              }
            />
            <Route
              path="/achievements"
              element={
                <ProtectedRoute token={auth.token}>
                  <Achievements />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute token={auth.token}>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
