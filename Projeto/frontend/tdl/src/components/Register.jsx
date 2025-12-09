import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRegister } from "../api";
import "./Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await apiRegister(name, email, password);
      alert("Conta criada com sucesso!");
      navigate("/login");
    } catch (err) {
      alert("Erro ao registrar: " + err.message);
    }

    setLoading(false);
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo-row">
          <div className="auth-logo-icon">📅</div>
          <span className="auth-logo-text">TDL</span>
        </div>

        <hr className="auth-divider" />

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <input
              type="text"
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <input
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <button className="auth-main-btn" type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div className="auth-or">
          <span className="line" />
          <span className="or-text">Ou</span>
          <span className="line" />
        </div>

        <div className="auth-footer">
          <span>Tem uma conta?</span>
          <Link to="/login" className="auth-secondary-btn">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
