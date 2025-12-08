import React from "react";
import "./Profile.css";

export default function Profile({ user }) {
  return (
    <div className="profile-page">
      <h2 className="profile-title">Perfil do Usuário</h2>

      <div className="profile-card">
        <div className="profile-avatar"></div>

        <div className="profile-info">
          <p>
            <strong>Nome:</strong> {user?.name || "Usuário"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email || "..."}
          </p>
          <p>
            <strong>Username:</strong> @{user?.username || "user"}
          </p>
        </div>
      </div>

      <button className="edit-profile-btn">Editar Perfil</button>
    </div>
  );
}
