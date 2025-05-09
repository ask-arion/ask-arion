import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/askarion-logo-silver.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (email && password) {
      localStorage.setItem('arion-user', JSON.stringify({ email }))
      navigate('/chat')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 sm:p-10 space-y-6 border border-gray-200">
        <div className="flex flex-col items-center space-y-4">
          <img src={logo} alt="Ask Arion" className="w-32 object-contain" />
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center">Ready when you are.</h1>
          <p className="text-gray-500 text-sm text-center">Log in to continue.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-sm"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          Don't have an account? <a href="/signup" className="text-indigo-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  )
}