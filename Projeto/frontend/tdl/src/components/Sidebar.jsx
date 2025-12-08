import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { FaUser, FaHome, FaBookmark, FaBullseye, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ user, onLogout }) => {
  const displayName = user?.name || "Usuário";
  const username = user?.email || "@user";

  return (
    <aside className="sidebar">
      <div className="user">
        <div className="avatar"></div>
        <p>
          {username}
          <br />
          <small>{displayName}</small>
        </p>
      </div>
      
      <nav>
        <ul>

        <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              <FaHome /> Home
            </NavLink>
          </li>

          {/* PERFIL */}
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              <FaUser /> Perfil
            </NavLink>
          </li>

          {/* CONQUISTAS */}
          <li>
            <NavLink
              to="/achievements"
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              <FaBullseye /> Conquistas
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Rodapé */}
      <div className="bottom">
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaCog /> Configurações
          </NavLink>
        </li>

        {/* SAIR */}
        <li className="logout" onClick={onLogout}>
          <FaSignOutAlt /> Sair
        </li>
      </div>
    </aside>
  );
};

export default Sidebar;
