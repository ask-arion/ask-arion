import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/askarion-logo-silver.png'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    if (email && password) {
      localStorage.setItem('arion-user', JSON.stringify({ email }))
      navigate('/chat')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-white to-indigo-300 animate-gradient-slow z-0" />
      <div className="relative z-10 bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl max-w-md w-full p-10 space-y-6 border border-gray-200">
        <div className="flex flex-col items-center space-y-4">
          <img
            src={logo}
            alt="Ask Arion"
            className="w-32 object-contain transition-all duration-1000 ease-in-out hover:drop-shadow-glow"
          />
          <h1 className="text-3xl font-semibold text-gray-800 tracking-wide text-center">Create your Arion account</h1>
          <p className="text-gray-500 text-sm text-center">Start your journey with clarity.</p>
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90 backdrop-blur-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90 backdrop-blur-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow hover:shadow-xl"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          Already have an account? <a href="/" className="text-indigo-600 hover:underline">Login</a>
        </p>
      </div>

      <style jsx="true">{`
        @keyframes gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          background-size: 400% 400%;
          animation: gradient-slow 20s ease infinite;
        }
        .hover\:drop-shadow-glow:hover {
          filter: drop-shadow(0 0 6px rgba(99, 102, 241, 0.6));
        }
      `}</style>
    </div>
  )
}