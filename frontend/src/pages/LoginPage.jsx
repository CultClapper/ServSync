import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import client from '../api/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await client.post('/auth/login', { email, password });
      localStorage.setItem('servsync_token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 mt-10">
      <h2 className="text-xl mb-4">Login to ServSync</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            className="border border-gray-300 w-full p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            className="border border-gray-300 w-full p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="bg-blue-700 text-white px-4 py-2 rounded" type="submit">
          Login
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        <span className="text-gray-600">Don't have an account? </span>
        <Link to="/register" className="text-blue-700 hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
}

