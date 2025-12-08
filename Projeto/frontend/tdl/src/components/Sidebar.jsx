import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaComments,
  FaBookmark,
  FaBullseye,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar({ user, onLogout }) {
  const name = user?.name || "user";
  const email = user?.email || "usuario@email.com";

  return (
    <aside className="sidebar">
      {/* topo - usuário */}
      <div>
        <div className="user">
          <div className="avatar"></div>
          <div className="user-text">
            <span className="user-nick">@{name}</span>
            <span className="user-email">{email}</span>
          </div>
        </div>

        {/* menu principal */}
        <nav className="nav">
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
      </div>

      {/* rodapé */}
      <div className="bottom">
        <NavLink to="/settings" className="settings-link">
          <FaCog /> Configurações
        </NavLink>

        <button
          className="logout"
          type="button"
          onClick={onLogout}
        >
          <FaSignOutAlt /> Sair
        </button>
      </div>
    </aside>
  );
}
