import React, { useState, useEffect } from "react";
import "./Settings.css";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  // carregar tema salvo
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);

    if (newValue) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <section className="settings-page">
      <div className="settings-card">
        <h2>Configurações</h2>

        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />{" "}
            Tema escuro
          </label>
        </div>
      </div>
    </section>
  );
};

export default Settings;
