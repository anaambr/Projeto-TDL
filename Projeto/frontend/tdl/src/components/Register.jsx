import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRegister } from "../api";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [erro, setErro] = useState("");
  const [okMsg, setOkMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setOkMsg("");

    try {
      // 🔥 Envio correto para o backend
      await apiRegister(name, email, password);

      setOkMsg("Cadastro realizado com sucesso! Redirecionando...");
      
      // Redireciona para login após 1 segundo
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      
    } catch (err) {
      setErro(err.message || "Erro ao registrar");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card glass">
        <h2>Criar Conta</h2>

        {erro && <p className="auth-error">{erro}</p>}
        {okMsg && <p className="auth-success">{okMsg}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Nome
            <input
              type="text"
              value={name}
              placeholder="Seu nome"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              placeholder="email@exemplo.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              value={password}
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit">Registrar</button>
        </form>

        <p className="auth-footer">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
