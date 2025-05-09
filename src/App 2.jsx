import React, { useState } from "react";
import logo from "./assets/askarion-logo.png";
import { getArionResponse } from "./arionBrain";

export default function ArionApp() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input.trim() };
    const arionReply = {
      type: "arion",
      text: getArionResponse(input),
    };

    setMessages([...messages, userMessage, arionReply]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 flex flex-col justify-between">
      <div className="flex-1 overflow-y-auto max-w-3xl w-full mx-auto p-6 space-y-6">
        <div className="flex justify-center mb-2">
          <img src={logo} alt="Ask Arion" className="w-48 md:w-64 object-contain" />
        </div>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`px-6 py-4 rounded-2xl max-w-xl whitespace-pre-wrap leading-relaxed ${
              msg.type === "user"
                ? "bg-indigo-100 text-right self-end ml-auto text-indigo-900 shadow"
                : "bg-white text-gray-800 self-start mr-auto shadow-md font-light tracking-wide"
            }`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl w-full mx-auto px-6 pb-6">
        <div className="flex items-end gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What’s rising in you today?"
            className="flex-1 rounded-2xl p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base h-24 resize-none shadow-sm"
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-5 py-3 rounded-2xl font-medium hover:bg-indigo-700 transition shadow"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
