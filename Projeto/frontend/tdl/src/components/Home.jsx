import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { FaRocket, FaClipboardList, FaUser } from "react-icons/fa";

export default function Home() {
  return (
    <section className="home-container">
      <div className="home-card">
        <div className="icon-bg">
          <FaRocket className="home-icon" />
        </div>

        <h1>Bem-vindo(a) ao TaskFlow!</h1>
        <p className="subtitle">
          Organize suas tarefas, metas e rotina em um único lugar.
        </p>

        <div className="home-buttons">
          <Link to="/login" className="btn primary">
            <FaClipboardList /> Acessar Dashboard
          </Link>

          <Link to="/register" className="btn secondary">
            <FaUser /> Criar Conta
          </Link>
        </div>
      </div>
    </section>
  );
}
