import React from "react";
import "./Achievements.css";

export default function Achievements() {
  const achievements = [
    "Primeira tarefa concluída",
    "7 dias seguidos produtivos",
    "Primeiro objetivo semanal concluído",
    "Concluiu 10 tarefas no total"
  ];

  return (
    <section className="achievements-card">
      <h2>Conquistas</h2>

      <ul>
        {achievements.map((item, index) => (
          <li key={index} className="achievement-item">
            🏅 {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
