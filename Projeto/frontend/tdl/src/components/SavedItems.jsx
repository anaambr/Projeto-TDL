import React from "react";
import "./SavedItems.css";

export default function SavedItems() {
  const saved = [
    "Lembrar de estudar",
    "Comprar itens para o projeto",
    "Meta semanal"
  ];

  return (
    <div className="saved-container">
      <h2 className="saved-title">Itens Salvos</h2>
      <div className="saved-list">
        {saved.map((item, i) => (
          <div className="saved-item" key={i}>
            ⭐ {item}
          </div>
        ))}
      </div>
    </div>
  );
}
