import React, { useEffect, useState } from "react";
import "./Achievements.css";


export default function Achievements() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("achievements")) || [];
    setAchievements(stored);
  }, []);

  return (
    <section className="achievements-card">
      <h2>Conquistas</h2>

      {achievements.length === 0 ? (
        <p className="no-achievements">Nenhuma conquista desbloqueada ainda.</p>
      ) : (
        <ul>
          {achievements.map((ach, index) => (
            <li key={index} className="achievement-item">
              🏅 {ach}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
