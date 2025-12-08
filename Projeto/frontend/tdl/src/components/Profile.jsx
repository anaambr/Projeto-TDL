import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  // Carrega dados do usuário do localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Usuário Exemplo",
    username: "user",
    email: "email@example.com",
  };

  const [user, setUser] = useState(storedUser);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(storedUser);

  useEffect(() => {

    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    setUser(form);
    setIsEditing(false);
  };

  return (
    <section className="profile-page card--dark">
      <h2 style={{ color: "white" }}>Perfil do Usuário</h2>

      <div className="profile-info">
        <div className="avatar-large"></div>

        <div className="details">
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Username:</strong> @{user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>

      <button className="edit-btn" onClick={() => setIsEditing(true)}>
        Editar Perfil
      </button>

      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Editar Perfil</h3>

            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <div className="modal-actions">
              <button onClick={() => setIsEditing(false)}>Cancelar</button>
              <button className="save-btn" onClick={saveChanges}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
