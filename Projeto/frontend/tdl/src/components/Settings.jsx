import React, { useState } from "react";
import "./Settings.css";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(false);

  return (
    <section className="settings-card">
      <h2>Configurações</h2>

      <div className="setting-item">
        <label className="switch-label">
          <span>Tema escuro</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </label>
      </div>

      <div className="setting-item">
        <label className="switch-label">
          <span>Notificações</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </label>
      </div>

      <div className="setting-item">
        <label className="switch-label">
          <span>Sons do sistema</span>
          <input
            type="checkbox"
            checked={sounds}
            onChange={() => setSounds(!sounds)}
          />
        </label>
      </div>
    </section>
  );
}
