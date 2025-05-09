import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import logo from '../assets/askarion-logo-silver.png';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await createUserWithEmailAndPassword(email, password);
    if (res) navigate('/chat');
  };

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
          {error && <p className="text-red-600">{error.message}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow hover:shadow-xl"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          Already have an account? <Link to="/" className="text-indigo-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}