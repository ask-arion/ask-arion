
import React, { useState, useRef, useEffect } from "react";
import logo from "./assets/askarion-logo.png";
import { getArionResponse } from "./arionBrain";

export default function ArionApp() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const delay = Math.min(2000, 600 + input.length * 30);
    setTimeout(() => {
      const arionReply = {
        type: "arion",
        text: getArionResponse(input),
      };
      setMessages((prev) => [...prev, arionReply]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 flex flex-col">
      <div className="flex flex-col max-w-3xl w-full mx-auto p-6 pt-4 pb-2">
        <div className="flex justify-center mb-2">
          <img src={logo} alt="Ask Arion" className="w-48 md:w-64 object-contain" />
        </div>
        <p className="text-center text-gray-500 text-lg font-light mb-4 italic">
          How can I help you today?
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 max-w-3xl w-full mx-auto space-y-6 pb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.type === "arion" && (
              <div className="w-4 h-4 mt-2 rounded-full bg-indigo-300 shadow-md animate-pulse"></div>
            )}
            <div
              className={`px-6 py-4 rounded-2xl max-w-xl whitespace-pre-wrap leading-relaxed transition-opacity duration-500 ${
                msg.type === "user"
                  ? "bg-indigo-100 text-right text-indigo-900 shadow"
                  : "bg-white text-gray-800 shadow-md font-light tracking-wide"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 mt-2 rounded-full bg-indigo-300 shadow-md animate-ping"></div>
            <div className="bg-white px-4 py-3 rounded-2xl text-gray-500 shadow text-sm font-light">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="sticky bottom-0 bg-indigo-50 border-t border-gray-200 w-full z-10">
        <div className="max-w-3xl w-full mx-auto px-6 py-4">
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
    </div>
  );
}
