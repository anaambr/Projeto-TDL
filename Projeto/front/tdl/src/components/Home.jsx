import React from "react";
import "./Home.css";
import { FaRocket, FaClipboardList, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="home-container">

      <div className="home-card glass">
        <div className="icon-bg">
          <FaRocket className="home-icon" />
        </div>

        <h1>Bem-vindo!</h1>
        <p className="subtitle">
          Organize suas tarefas, metas e rotinas tudo em um só lugar.
        </p>

        <div className="buttons">
          <Link to="/" className="btn primary">
            <FaClipboardList /> Ir para o Dashboard
          </Link>

          <Link to="/profile" className="btn secondary">
            <FaUser /> Ver Perfil
          </Link>
        </div>
      </div>

    </section>
  );
};

export default Home;
