import React from 'react'
import logo from '../assets/askarion-logo-silver.png'

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('arion-user'))

  const handleLogout = () => {
    localStorage.removeItem('arion-user')
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-white to-indigo-300 animate-gradient-slow z-0" />
      <div className="relative z-10 bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl max-w-lg w-full p-10 space-y-6 border border-gray-200 text-center">
        <img
          src={logo}
          alt="Ask Arion"
          className="w-24 mx-auto object-contain transition-all duration-1000 ease-in-out hover:drop-shadow-glow"
        />
        <h1 className="text-3xl font-semibold text-gray-800">Welcome, {user?.email}</h1>
        <p className="text-gray-600 text-sm">This is your Arion space. More features are coming soon.</p>
        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow hover:shadow-lg"
        >
          Logout
        </button>
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