import React, { useState, useRef } from "react";
import { Send, SquareDashed } from "lucide-react";

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState(null);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
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
      if (err.name === "AbortError") {
        console.log("Generation stopped by user.");
      } else {
        console.error("Error:", err);
      }
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
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Area */}
      <div
        className="flex-1 overflow-y-auto p-6 space-y-4"
        style={{
          marginTop: "90px", // 👈 Adjust this value if your Topbar is taller
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 shadow"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Floating Input Bar */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center bg-white w-2/3 shadow-lg rounded-full p-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask something..."
            className="flex-1 outline-none px-4 py-2 rounded-full"
          />

          {loading ? (
            <button
              onClick={stopGeneration}
              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition"
            >
              <Square size={18} />
            </button>
          ) : (
            <button
              onClick={sendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition"
            >
              <Send size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
