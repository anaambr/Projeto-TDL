import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <section className="profile-page card--dark">
      <h2>Perfil do Usuário</h2>

      <div className="profile-info">
        <div className="avatar-large"></div>

        <div className="details">
          <p><strong>Nome:</strong> Usuário Exemplo</p>
          <p><strong>Username:</strong> @user</p>
          <p><strong>Email:</strong> user@email.com</p>
        </div>
      </div>

      <button className="edit-btn">Editar Perfil</button>
    </section>
  );
};

export default Profile;
