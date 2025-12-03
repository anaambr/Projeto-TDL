import React from "react";
import "./SavedItems.css";

const SavedItems = () => {
  const saved = ["Lembrar de estudar", "Comprar itens", "Meta semanal"];

  return (
    <section className="saved-page ">
      <h2>Itens Salvos</h2>

      <ul className="saved-list">
        {saved.map((s, i) => (
          <li key={i} className="saved-card">
            ⭐ {s}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SavedItems;
