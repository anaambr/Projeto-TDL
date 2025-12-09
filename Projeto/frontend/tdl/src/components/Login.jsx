import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiLogin } from "../api";
import "./Login.css";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await apiLogin(email, password);
      onLogin(data);
      navigate("/");
    } catch (err) {
      alert("Erro ao entrar: " + err.message);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* LOGO / TÍTULO */}
        <div className="auth-logo-row">
          <div className="auth-logo-icon">📅</div>
          <span className="auth-logo-text">TDL</span>
        </div>

        <hr className="auth-divider" />

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <input
              type="email"
              placeholder="Usuário"
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

          <button className="auth-main-btn" type="submit">
            Entrar
          </button>
        </form>

        {/* separador "Ou" */}
        <div className="auth-or">
          <span className="line" />
          <span className="or-text">Ou</span>
          <span className="line" />
        </div>

        {/* link de cadastro */}
        <div className="auth-footer">
          <span>Não tem uma conta?</span>
          <Link to="/register" className="auth-secondary-btn">
            Cadastrar
          </Link>
        </div>
      </div>
    </div>
  );
}
