import React, { useState } from "react";
import "./Chat.css";

export default function Chat() {
  const [messages, setMessages] = useState([
    { from: "system", text: "Olá! Como posso ajudar hoje? 😊" }
  ]);

  const [input, setInput] = useState("");

  function sendMessage() {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { from: "me", text: input }
    ]);

    setInput("");
  }

  return (
    <div className="chat-container">
      <h2 className="chat-title">Bate-papo</h2>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <p
            className={`chat-msg ${msg.from === "me" ? "msg-me" : "msg-other"}`}
            key={i}
          >
            {msg.text}
          </p>
        ))}
      </div>

      <div className="chat-input-row">
        <input
          type="text"
          placeholder="Digite uma mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="chat-btn" onClick={sendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
}
