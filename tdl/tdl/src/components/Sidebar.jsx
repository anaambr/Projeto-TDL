import React from "react";
import "./Sidebar.css";
import { FaUser, FaComments, FaBookmark, FaBullseye, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="user">
        <div className="avatar"></div>
        <p>@user<br /><small>Usuário</small></p>
      </div>

      <nav>
        <ul>
          <li><FaUser /> Perfil</li>
          <li><FaComments /> Bate-papo</li>
          <li><FaBookmark /> Itens salvos</li>
          <li><FaBullseye /> Conquistas</li>
        </ul>
      </nav>

      <div className="bottom">
        <li><FaCog /> Configurações</li>
        <li><FaSignOutAlt /> Sair</li>
      </div>
    </aside>
  );
};

export default Sidebar;
