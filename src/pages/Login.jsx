import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const provider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signInWithEmailAndPassword(email, password);
    if (res) navigate('/chat');
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/chat');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white shadow rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Login to Arion</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
          {error && <p className="text-red-500">{error.message}</p>}
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mt-4"
        >
          Sign in with Google
        </button>
        <p className="text-center mt-4">Don't have an account? <Link to="/signup" className="text-indigo-600">Sign up</Link></p>
      </div>
    </div>
  );
}