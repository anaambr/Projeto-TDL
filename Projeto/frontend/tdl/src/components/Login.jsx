import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiLogin } from "../api";
import "./Login.css"; // opcional, só pra estilizar depois

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const data = await apiLogin(email, password);
      // data: { message, token, user }
      if (onLogin) {
        onLogin(data);
      }
      navigate("/");
    } catch (err) {
      setErro(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card glass">
        <h2>Entrar</h2>

        {erro && <p className="auth-error">{erro}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="auth-footer">
          Não tem conta? <Link to="/register">Registrar</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
