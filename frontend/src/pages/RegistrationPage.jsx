import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import client from '../api/client';

export default function RegistrationPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('planner');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await client.post('/auth/register', { name, email, password, role });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMessage);
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 mt-10">
      <h2 className="text-xl mb-4">Register for ServSync</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && (
        <div className="text-green-600 mb-2">
          Registration successful! Redirecting to login...
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <input
            type="text"
            className="border border-gray-300 w-full p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
            minLength={6}
          />
        </div>
        <div>
          <label className="block text-sm">Confirm Password</label>
          <input
            type="password"
            className="border border-gray-300 w-full p-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <div>
          <label className="block text-sm">Role</label>
          <select
            className="border border-gray-300 w-full p-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="planner">Planner</option>
            <option value="operator">Operator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="bg-blue-700 text-white px-4 py-2 rounded w-full" type="submit">
          Register
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        <span className="text-gray-600">Already have an account? </span>
        <Link to="/login" className="text-blue-700 hover:underline">
          Login here
        </Link>
      </div>
    </div>
  );
}

