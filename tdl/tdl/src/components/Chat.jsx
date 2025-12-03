import React, { useState } from "react";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([
    { from: "outro", text: "Olá! Como posso ajudar?" }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { from: "me", text: input }]);
    setInput("");
  };

  return (
    <section className="chat-page card--dark">
      <h2>Bate-papo</h2>

      <div className="chat-area">
        {messages.map((m, i) => (
          <p key={i} className={m.from === "me" ? "msg-me" : "msg-other"}>
            {m.text}
          </p>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Digite uma mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </section>
  );
};

export default Chat;
