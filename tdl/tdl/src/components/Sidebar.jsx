import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaComments,
  FaBookmark,
  FaBullseye,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      {/* Usuário */}
      <div className="user">
        <div className="avatar"></div>
        <p>
          @user<br />
          <small>Usuário</small>
        </p>
      </div>

      {/* Navegação */}
      <nav>
        <ul>

          {/* BATE-PAPO */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FaComments /> Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FaUser /> Perfil
            </NavLink>
          </li>

          {/* ITENS SALVOS */}
          <li>
            <NavLink
              to="/saved"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FaBookmark /> Itens salvos
            </NavLink>
          </li>

          {/* CONQUISTAS */}
          <li>
            <NavLink
              to="/achievements"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FaBullseye /> Conquistas
            </NavLink>
          </li>

        </ul>
      </nav>

      {/* Rodapé */}
      <div className="bottom">

        {/* CONFIGURAÇÕES */}
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaCog /> Configurações
          </NavLink>
        </li>

        {/* SAIR */}
        <li className="logout">
          <FaSignOutAlt /> Sair
        </li>

      </div>
    </aside>
  );
};

export default Sidebar;
