import React, { useState } from 'react'
import logo from '../assets/askarion-logo-silver.png'
import { getArionResponse } from '../arionBrain'

export default function ChatShell() {
  const [section, setSection] = useState('ASK')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)

  const user = JSON.parse(localStorage.getItem('arion-user'))

  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage = { type: 'user', text: input.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    const delay = Math.min(2000, 600 + input.length * 30)
    setTimeout(() => {
      const arionReply = {
        type: 'arion',
        text: getArionResponse(input),
      }
      setMessages((prev) => [...prev, arionReply])
      setIsTyping(false)
    }, delay)
  }

  const renderMainView = () => {
    if (section === 'ASK') {
      return (
        <div className="flex-1 flex flex-col justify-between">
          <div className="overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={\`flex \${msg.type === 'user' ? 'justify-end' : 'justify-start'}\`}
              >
                <div className={\`max-w-xl px-4 py-3 rounded-2xl whitespace-pre-wrap shadow
                  \${msg.type === 'user' ? 'bg-indigo-100 text-indigo-900' : 'bg-white text-gray-800'}\`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-gray-400 text-sm">Arion is typing...</div>
            )}
          </div>
          <div className="p-4 border-t bg-white flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Ask Arion anything..."
              className="flex-1 rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={handleSend}
              className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition shadow"
            >
              Send
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex-1 flex items-center justify-center text-gray-500 italic text-lg">
          {section} view coming soon...
        </div>
      )
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-56 bg-white border-r shadow-sm p-6 space-y-6">
        <img src={logo} alt="Ask Arion" className="w-28 mb-8" />
        {['CIRCLE', 'DAILY', 'FORECAST', 'BLUEPRINT', 'ASK'].map((item) => (
          <button
            key={item}
            onClick={() => setSection(item)}
            className={\`block w-full text-left px-4 py-2 rounded-lg font-medium transition 
              \${section === item ? 'bg-indigo-100 text-indigo-800' : 'text-gray-700 hover:bg-gray-100'}\`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="w-full px-6 py-4 border-b bg-white flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-700">Arion</h2>
          <div className="text-sm text-gray-500">Signed in as <span className="font-semibold">{user?.email}</span></div>
        </div>

        {/* Section content */}
        {renderMainView()}
      </div>
    </div>
  )
}