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
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Senha</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn-primary">Entrar</button>

        <p className="switch-text">
          Ainda não tem conta? <Link to="/register">Criar conta</Link>
        </p>
      </form>
    </div>
  );
}
