import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <section className="settings-page">
      <h2>Configurações</h2>

      <div className="setting-item">
        <label>
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)}
          />
          Tema escuro
        </label>
      </div>

      <div className="setting-item">
        <label>
          <input type="checkbox" />
          Notificações
        </label>
      </div>

      <div className="setting-item">
        <label>
          <input type="checkbox" />
          Sons do sistema
        </label>
      </div>
    </section>
  );
};

export default Settings;
