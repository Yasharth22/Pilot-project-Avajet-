import React, { useState, useEffect, useRef } from "react";
import { Send, SquareDashed } from "lucide-react";
import "../assets/style.css";

// Quick reply buttons shown below the chat for easy access
const QUICK_REPLIES = [
  "What is CAMO?",
  "Explain aircraft maintenance tasks",
  "How can you help me with compliance?",
  "Show recent maintenance logs",
];

// Auto-suggestions while typing
const AUTO_SUGGESTIONS = [
  "Hello",
  "What is CAMO?",
  "Explain AI models in aviation",
  "Help me with aircraft maintenance",
  "Show recent flight reports",
  "How to comply with regulations",
  "Generate a maintenance checklist",
  "Provide safety procedures",
  "Summarize inspection reports",
  "Give me a summary of today's flights",
  "Tell me about aviation safety tips"
];


const AIAssistant = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("ai_chat_messages");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState(() => localStorage.getItem("ai_chat_input") || "");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const chatEndRef = useRef(null);

  const [settings] = useState(() => {
    const saved = localStorage.getItem("userSettings");
    if (!saved) return {};
    try {
      return JSON.parse(saved);
    } catch {
      return {};
    }
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    localStorage.setItem("ai_chat_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("ai_chat_input", input);
  }, [input]);

  // Update suggestions as user types
  useEffect(() => {
    if (settings.aiAutoSuggestions && input.trim()) {
      const filtered = AUTO_SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filtered);
    } else setSuggestions([]);
  }, [input, settings.aiAutoSuggestions]);

  const getCurrentTime = () => {
    const date = new Date();
    return settings.dateFormat === "24h"
      ? date.toTimeString().slice(0, 5)
      : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sendMessage = async (msgText = null) => {
    const textToSend = msgText ?? input;
    if (!textToSend.trim() || loading) return;

    const userMessage = { sender: "user", text: textToSend, time: getCurrentTime() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSuggestions([]);
    setLoading(true);

    const abortController = new AbortController();
    setController(abortController);

    const aiIndex = messages.length + 1;
    setMessages((prev) => [...prev, { sender: "ai", text: "", time: getCurrentTime() }]);

    try {
      const response = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend, model: settings.aiModel || "phi3:mini" }),
        signal: abortController.signal,
      });

      if (!response.ok) throw new Error("Failed to fetch AI response");

      const data = await response.json();
      const finalText = data.response || "(No response)";

      setMessages((prev) => {
        const updated = [...prev];
        updated[aiIndex] = {
          ...updated[aiIndex],
          text: finalText,
          highlighted: settings.aiHighlightResponses || false,
        };
        return updated;
      });

      // Auto-save responses
      if (settings.aiAutoSaveResponses) {
        const savedHistory = JSON.parse(localStorage.getItem("ai_chat_messages") || "[]");
        localStorage.setItem("ai_chat_messages", JSON.stringify([...savedHistory, { sender: "ai", text: finalText }]));
      }

      // Completion notification
      if (settings.aiCompletionNotification) {
        new Notification("AI Assistant", { body: "Response generated!" });
      }

    } catch (err) {
      if (err.name === "AbortError") console.log("Stopped by user.");
      else setMessages((prev) => [...prev, { sender: "ai", text: "⚠️ Error fetching AI response.", time: getCurrentTime() }]);
      console.error("Error:", err);
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

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("ai_chat_messages");
  };

  const clearHistory = () => {
    localStorage.removeItem("ai_chat_messages");
    alert("Chat history cleared!");
  };

  return (
    <div className="aiassistant-container">
      {/* Chat Messages */}
      <div className="aiassistant-chat">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${msg.sender === "user" ? "user-msg" : "ai-msg"} ${msg.highlighted ? "highlight" : ""}`}
          >
            {msg.text}
            {settings.aiShowTimestamps && <div className="msg-time">{msg.time}</div>}
          </div>
        ))}

        {/* Typing indicator */}
        {loading && settings.aiTypingDots && (
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input + Send/Stop */}
      <div className="aiassistant-input-container">
        <div className="aiassistant-inputbar">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
            placeholder="Type your message..."
            disabled={loading}
          />
          {loading ? (
            <button onClick={stopGeneration} className="stop">
              <SquareDashed />
            </button>
          ) : (
            <button onClick={() => sendMessage()} className="send" disabled={!input.trim()}>
              <Send />
            </button>
          )}
        </div>

        {/* Auto-suggestions dropdown */}
        {settings.aiAutoSuggestions && suggestions.length > 0 && (
          <div className="auto-suggestions">
            {suggestions.map((s, idx) => (
              <div key={idx} className="suggestion-item" onClick={() => sendMessage(s)}>
                {s}
              </div>
            ))}
          </div>
        )}

        {/* Quick Replies */}
        {settings.aiQuickReplies && (
          <div className="quick-replies">
            {QUICK_REPLIES.map((q, idx) => (
              <button key={idx} onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Footer: Model + Clear */}
        <div className="aiassistant-footer-meta">
          <div className="footer-model">Model: {settings.aiModel || "phi3:mini"}</div>
          <div className="footer-actions">
            <button className="clear-history-btn" onClick={clearHistory}>Clear History</button>
            <button className="clear-history-btn" onClick={clearChat}>Clear Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
