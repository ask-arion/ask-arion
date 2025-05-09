import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white shadow rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Arion Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
          {error && <p className="text-red-500">{error.message}</p>}
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">{loading ? 'Creating...' : 'Sign Up'}</button>
        </form>
        <p className="text-center mt-4">Already have an account? <Link to="/" className="text-indigo-600">Login</Link></p>
      </div>
    </div>
  );
}