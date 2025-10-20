import React, { useState, useEffect, useRef } from "react";
import { Send, SquareDashed } from "lucide-react";
import "../assets/style.css";

const AIAssistant = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("ai_chat_messages");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState(() => {
    return localStorage.getItem("ai_chat_input") || "";
  });

  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState(null);
  const chatEndRef = useRef(null);

  // 🔹 Auto-scroll to bottom when new messages come in
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Persist chat messages
  useEffect(() => {
    localStorage.setItem("ai_chat_messages", JSON.stringify(messages));
  }, [messages]);

  // 🔹 Persist current input
  useEffect(() => {
    localStorage.setItem("ai_chat_input", input);
  }, [input]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    const abortController = new AbortController();
    setController(abortController);

    try {
      const response = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
        signal: abortController.signal,
      });

      const data = await response.json();
      const aiMessage = { sender: "ai", text: data.response || "(No response)" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      if (err.name === "AbortError") console.log("Stopped by user.");
      else console.error("Error:", err);
    } finally {
      setLoading(false);
      setController(null);
    }
  };

  const stopGeneration = () => {
    if (controller) {
      controller.abort();
      setLoading(false);
      setController(null);
    }
  };

  return (
    <div className="aiassistant-container">
      <div className="aiassistant-chat">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.sender === "user" ? "user-msg" : "ai-msg"}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="aiassistant-input-container">
        <div className="aiassistant-inputbar">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
            placeholder={loading ? "Generating response..." : "Ask something..."}
            disabled={loading}
          />
          {loading ? (
            <button onClick={stopGeneration} className="stop">
              <SquareDashed />
            </button>
          ) : (
            <button
              onClick={sendMessage}
              className="send"
              disabled={!input.trim()}
            >
              <Send />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
