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

import {
  apiGetTasks,
  apiCreateTask,
  apiUpdateTask,
  apiDeleteTask,
} from "./api";

import {
  FaClipboardList,
  FaLightbulb,
  FaClock,
  FaBullhorn,
} from "react-icons/fa";
import "./App.css";

const ProtectedRoute = ({ token, children }) => {
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const [auth, setAuth] = useState({
    token: null,
    user: null,
  });

  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [tasksError, setTasksError] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setAuth({
        token: storedToken,
        user: JSON.parse(storedUser),
      });
    }
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!auth.token) return;
      setLoadingTasks(true);
      setTasksError("");

      try {
        const data = await apiGetTasks(auth.token);
        setTasks(data || []);
      } catch (err) {
        setTasksError(err.message || "Erro ao carregar tarefas");
      } finally {
        setLoadingTasks(false);
      }
    };

    fetchTasks();
  }, [auth.token]);

  const handleLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setAuth({
      token: data.token,
      user: data.user,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ token: null, user: null });
    setTasks([]);
  };

  const handleCreateTask = async (title, description) => {
    try {
      const data = await apiCreateTask(auth.token, { title, description });
      setTasks((prev) => [...prev, data.task]);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const data = await apiUpdateTask(auth.token, id, updates);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? data.task : task))
      );
      setEditingTask(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === "concluida" ? "pendente" : "concluida";
    handleUpdateTask(task.id, { status: newStatus });
  };

  const handleDeleteTask = async (task) => {
    if (!window.confirm("Excluir esta tarefa?")) return;

    try {
      await apiDeleteTask(auth.token, task.id);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    } catch (err) {
      alert(err.message);
    }
  };

  const pendingTasks = tasks.filter((t) => t.status !== "concluida");
  const priorityTasks = pendingTasks.slice(0, 4);

  return (
    <Router>
      <div className="container">
        {auth.token && (
          <Sidebar user={auth.user} onLogout={handleLogout} />
        )}

        <main className="main">
          {auth.token && (
            <header className="top-bar glass">
              <input type="text" placeholder="Pesquisar tarefa..." />
              <span className="bell">🔔</span>
            </header>
          )}

          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <ProtectedRoute token={auth.token}>
                  <div className="dashboard-grid">
                    <TaskList
                      title="Tarefas"
                      icon={<FaClipboardList />}
                      dark
                      tasks={tasks}
                      loading={loadingTasks}
                      error={tasksError}
                      onToggleStatus={handleToggleStatus}
                      onDelete={handleDeleteTask}
                      onEdit={(task) => setEditingTask(task)}
                    />

                    <div className="mid-column">
                      <TaskList
                        title="Prioridade"
                        icon={<FaLightbulb />}
                        gray
                        tasks={priorityTasks}
                        loading={loadingTasks}
                        error={tasksError}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDeleteTask}
                        onEdit={(task) => setEditingTask(task)}
                      />

                      <TaskList
                        title="Pendentes"
                        icon={<FaClock />}
                        gray
                        tasks={pendingTasks}
                        loading={loadingTasks}
                        error={tasksError}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDeleteTask}
                        onEdit={(task) => setEditingTask(task)}
                      />

                      <Operations
                        onCreateTask={handleCreateTask}
                        onUpdateTask={handleUpdateTask}
                        editingTask={editingTask}
                      />
                    </div>

                    <div className="right-column">
                      <Calendar />
                      <WeeklyTasks icon={<FaBullhorn />} />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute token={auth.token}>
                  <Profile />
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

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
