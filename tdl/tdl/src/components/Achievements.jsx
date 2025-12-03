import React from "react";
import "./Achievements.css";

const Achievements = () => {
  const items = [
    "Primeira tarefa concluída",
    "7 dias consecutivos produtivos",
    "Primeiro objetivo semanal"
  ];

  return (
    <section className="achievements-page card--dark">
      <h2>Conquistas</h2>

      <ul className="achievement-list">
        {items.map((a, i) => (
          <li key={i}>🏅 {a}</li>
        ))}
      </ul>
    </section>
  );
};

export default Achievements;
