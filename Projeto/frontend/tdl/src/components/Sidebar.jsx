import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaComments,
  FaBookmark,
  FaBullseye,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar({ user }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <aside className="sidebar">
      <div className="user-section">
        <div className="avatar"></div>
        <div className="user-info">
          <strong>@{user?.username || "user"}</strong>
          <small>{user?.email || "Usuário"}</small>
        </div>
      </div>

      <nav className="menu">
        <ul>
          <li>
            <NavLink to="/profile">
              <FaUser /> Perfil
            </NavLink>
          </li>

          <li>
            <NavLink to="/chat">
              <FaComments /> Bate-papo
            </NavLink>
          </li>

          <li>
            <NavLink to="/saved">
              <FaBookmark /> Itens salvos
            </NavLink>
          </li>

          <li>
            <NavLink to="/achievements">
              <FaBullseye /> Conquistas
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="sidebar-bottom">
        <NavLink to="/settings" className="settings-link">
          <FaCog /> Configurações
        </NavLink>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Sair
        </button>
      </div>
    </aside>
  );
}
