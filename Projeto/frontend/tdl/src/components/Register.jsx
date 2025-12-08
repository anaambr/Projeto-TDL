import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRegister } from "../api";
import "./Register.css";

export default function Register() {
  const [name, setName] = useState("");
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

      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Registrar</h2>

        <label>Nome</label>
        <input 
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          placeholder="Crie uma senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Criando conta..." : "Registrar"}
        </button>

        <p className="switch-text">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </form>

    </div>
  );
}
